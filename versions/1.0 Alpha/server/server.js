const WebSocket = require('ws');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const readline = require('readline');

const PORT = 8080;
const server = new WebSocket.Server({ port: PORT });
const CHUNK_SIZE = 4096;

console.log(`WebSocket server running on port ${PORT}...`);
console.log('Waiting for client connection...');

function getFormattedDate() {
    return new Date().toISOString().split('T')[0];
}

async function updateWallpapersFile(entries) {
    try {
        await fsPromises.writeFile('wallpapers.json', JSON.stringify({
            entries: entries,
            lastUpdated: getFormattedDate()
        }, null, 2));
        console.log('✅ wallpapers.json updated');
    } catch (error) {
        console.error('Error updating wallpapers.json:', error);
    }
}

async function resetWallpapersFile() {
    try {
        await fsPromises.writeFile('wallpapers.json', JSON.stringify({ entries: [] }, null, 2));
        console.log('✅ wallpapers.json reset');
    } catch (error) {
        console.error('Error resetting wallpapers.json:', error);
    }
}

async function syncEntriesWithClient(clientEntries) {
    await updateWallpapersFile(clientEntries);
    return clientEntries;
}

function normalizeName(name) {
    return name.trim().replace(/\s+/g, ' ');
}

function clearConsoleAndShowVideos(videoList) {
    console.clear();
    console.log('\nAvailable videos:');
    videoList.forEach((item, index) => {
        console.log(`[${index + 1}] ${item.file.padEnd(25)} ${item.status}`);
    });
}

server.on('listening', async () => {
    await resetWallpapersFile();
});

server.on('connection', (ws) => {
    console.log('Client connected!');
    let clientEntries = [];
    let isDownloading = false;

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            
            if (data.type === 'init') {
                clientEntries = await syncEntriesWithClient(data.wallpaperEntries || []);
                console.log('✅ Initial sync completed (originalName)');
                handleVideoUpload();
            }
            else if (data.type === 'delete') {
                const serverEntries = JSON.parse(await fsPromises.readFile('wallpapers.json', 'utf-8')).entries;
                const updatedEntries = serverEntries.filter(entry => entry.originalName !== data.originalName);
                
                await updateWallpapersFile(updatedEntries);
                clientEntries = updatedEntries;
                
                console.log(`File "${data.originalName}" removed by the client`);
                ws.send(JSON.stringify({ type: 'sync', entries: updatedEntries }));
            }
            else if (data.type === 'sync') {
                clientEntries = await syncEntriesWithClient(data.entries);
                console.log('✅ Background sync completed');
            }
            
        } catch (e) {
            console.error('Error processing message:', e);
        }
    });

    const handleVideoUpload = async () => {
        try {
            const videosDir = path.join(__dirname, 'videos');
            if (!fs.existsSync(videosDir)) {
                throw new Error('Folder "videos" not found!');
            }

            const files = fs.readdirSync(videosDir);
            const VALID_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv', '.wmv', '.mpeg', '.mpg'];
            const existingEntries = JSON.parse(await fsPromises.readFile('wallpapers.json', 'utf-8')).entries;

            const videoList = files
                .filter(file => VALID_EXTENSIONS.includes(path.extname(file).toLowerCase()))
                .map(file => {
                    const originalName = normalizeName(path.parse(file).name);
                    const entry = existingEntries.find(e => 
                        e.originalName.toLowerCase() === originalName.toLowerCase()
                    );
                    return {
                        file,
                        originalName,
                        status: entry ? '[DOWNLOADED]' : '[NEW]'
                    };
                });

            if (videoList.length === 0) {
                console.log('No videos available in the folder!');
                ws.close();
                return;
            }

            clearConsoleAndShowVideos(videoList);

            const selectedVideoPath = await selectVideo(videoList, videosDir)
                .catch(async (error) => {
                    if (error.message === 'RELOAD') {
                        await handleVideoUpload();
                        return;
                    }
                    if (error.message === 'EXIT') {
                        console.log('Closing connection...');
                        ws.close();
                        return;
                    }
                    if (error.message === 'Invalid number!') {
                        console.log('⚠️  Invalid number!');
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await handleVideoUpload();
                        return;
                    }
                    throw error;
                });

            if (!selectedVideoPath) return;

            const videoName = normalizeName(path.parse(selectedVideoPath).name);
            const fileSize = fs.statSync(selectedVideoPath).size;
            const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);

            if (clientEntries.some(entry => entry.originalName === videoName)) {
                console.log(`⚠️  Video "${videoName}" already exists. Skipping...`);
                ws.send(JSON.stringify({ type: 'error', message: 'File already downloaded' }));

                const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
                rl.pause();
                await new Promise(resolve => setTimeout(resolve, 1500));
                rl.resume();
                rl.close();

                await handleVideoUpload();
                return;
            }

            isDownloading = true;

            ws.send(JSON.stringify({
                type: 'metadata',
                name: `${videoName}.mp4`,
                originalName: videoName,
                totalChunks: totalChunks,
                fileSize: fileSize
            }));

            const videoStream = fs.createReadStream(selectedVideoPath, { highWaterMark: CHUNK_SIZE });
            let chunksSent = 0;

            videoStream.on('data', (chunk) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(chunk);
                    chunksSent++;
                    
                    const progress = (chunksSent / totalChunks) * 100;
                    const progressBar = `[${'■'.repeat(Math.round(progress / 5))}${'□'.repeat(20 - Math.round(progress / 5))}]`;
                    console.log(`Upload progress: ${progressBar} ${progress.toFixed(1)}%`);
                }
            });

            await new Promise((resolve) => {
                videoStream.on('end', () => {
                    clientEntries.push({ originalName: videoName });
                    updateWallpapersFile(clientEntries);
                    ws.send(JSON.stringify({ type: 'sync', entries: clientEntries }));
                    console.log(`✔️ File "${videoName}" sent successfully`);
                    isDownloading = false;
                    resolve();
                });
                
                videoStream.on('error', (err) => {
                    console.error('Stream error:', err);
                    resolve();
                });
            });

            await handleVideoUpload();

        } catch (error) {
            if (error.message === 'RELOAD' || error.message === 'EXIT') return;
            console.error('Error:', error.message);
            ws.close();
        }
    };

    ws.on('close', async () => {
        console.log('\n⚠️  Connection closed. Final sync...');
        await syncEntriesWithClient(clientEntries);
        console.log('✅ Final sync completed');
    });
});

async function selectVideo(videoList, videosDir) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('\nEnter the video number, R to reload, or E to exit: ', (answer) => {
            rl.close();
            const input = answer.trim().toLowerCase();
            
            if (input === 'r') {
                reject(new Error('RELOAD'));
                return;
            }
            else if (input === 'e') {
                reject(new Error('EXIT'));
                return;
            }

            const selectedIndex = parseInt(input) - 1;
            
            if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= videoList.length) {
                reject(new Error('Invalid number!'));
                return;
            }

            resolve(path.join(videosDir, videoList[selectedIndex].file));
        });
    });
}