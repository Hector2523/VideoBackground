/**
 * @name VideoBackground
 * @author Hector
 * @version 1.0 Alpha
 * @description Live Video Background!
 */

(function () {
    const css = `
      body, #app-mount, .appMount__51fd7 {
        background: none !important;
      }
      
      .theme-dark {
        --background-tertiary: rgba(25, 25, 25, 0.50) !important; 
        --background-primary: transparent !important;
        --background-secondary: transparent !important;
        --background-secondary-alt: transparent !important;
        --channeltextarea-background: transparent !important;
      }
      
      .wrapper-3NnKdC,
      .scroller-1Bvpku,
      .app-2rEoOp,
      .theme-dark .container-1D34oG {
        background: transparent !important;
      }
      
      .fullscreen-bg video,
      .fullscreen-bg-video {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        z-index: -100 !important;
        min-width: 100% !important;
        min-height: 100% !important;
        width: 0;
        height: auto;
        transform: translate(-50%, -50%) !important;
      }
      
      .name__2ea32 {
        transition: .2s ease-in-out;
      }
    `;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();

const PLUGIN_VERSION = 0.1;

module.exports = (() => {
    const config = {
        info: {
            name: "Video Background",
            author: "Hector",
            version: "1.0 Alpha",
            description: "Make your Discord background a video! CSS is a must!"
        },
        db: {
            name: 'VideoBackgroundCache',
            store: 'videos'
        },
        ws: {
            defaultUrl: 'ws://localhost:8080',
            retries: 5,
            retryDelay: 3000,
            cooldown: 2000
        }
    };

    return class VideoBackground {
        constructor() {
            this.cachedWallpapers = {};
            this.videoURL = '';
            this.currentVideoName = '';
            this.settingsPanel = null;
            this.ws = null;
            this.chunks = [];
            this.currentVideoMeta = {};
            this.isDownloading = false;
            this.downloadQueue = [];
            this.canDownload = true;
            this.pluginVersion = PLUGIN_VERSION;
        }

        getName = () => config.info.name;
        getAuthor = () => config.info.author;
        getVersion = () => config.info.version;
        getDescription = () => config.info.description;

        async start() {
            try {
                await this.initCache();
                await this.applyLastUsedWallpaper();
                await this.refreshUI();
            } catch (error) {
                this.handleError(error);
            }
        }

        stop() {
            this.removeVideoElement();
            this.ws?.close();
            this.isDownloading = false;
            this.downloadQueue = [];
            this.canDownload = true;
        }

        async initCache() {
            this.cachedWallpapers = await this.getAllCachedWallpapers();
        }

        async applyLastUsedWallpaper() {
            const lastUsed = await this.executeDB('get', { key: '__lastUsed__' });
            if (!lastUsed?.lastUsed) return false;

            const exists = await this.executeDB('get', { key: lastUsed.lastUsed });
            if (!exists) {
                await this.executeDB('put', {
                    data: { name: '__lastUsed__', lastUsed: '' }
                });
                return false;
            }

            const cached = await this.getCachedVideo(lastUsed.lastUsed);
            if (cached) {
                this.videoURL = cached;
                this.currentVideoName = lastUsed.lastUsed;
                this.injectVideo(true);
                await this.updateSelects(this.currentVideoName);
                return true;
            }
            return false;
        }

        injectVideo(forceReload = false) {
            const container = document.getElementById("fullscreen-bg") || this.createVideoContainer();
            const videoElement = container.querySelector('video');

            if (!videoElement || forceReload) {
                container.innerHTML = `
                    <video id="fullscreen-bg-video" autoplay muted loop>
                        <source src="${this.videoURL}" type="video/mp4">
                    </video>
                `;
            } else {
                const source = videoElement.querySelector('source');
                source.src = this.videoURL;
                videoElement.load();
                videoElement.play().catch(error => console.log("Autoplay prevented:", error));
            }
        }

        createVideoContainer() {
            const container = document.createElement("div");
            container.id = "fullscreen-bg";
            container.className = "fullscreen-bg";
            document.getElementById("app-mount").appendChild(container);
            return container;
        }

        removeVideoElement() {
            document.getElementById("fullscreen-bg")?.remove();
            if (this.videoURL) URL.revokeObjectURL(this.videoURL);
        }

        async connectWebSocket(url = config.ws.defaultUrl) {
            if (!this.canDownload) {
                this.downloadQueue.push(url);
                return;
            }

            this.canDownload = false;
            this.isDownloading = true;

            try {
                this.videoURL = await this.connectWebSocketWithRetry(url);
                this.injectVideo(true);
                await this.refreshUI();
            } catch (error) {
                this.handleError(error);
            } finally {
                setTimeout(() => {
                    this.canDownload = true;
                    if (this.downloadQueue.length > 0) {
                        this.connectWebSocket(this.downloadQueue.shift());
                    }
                }, config.ws.cooldown);
                this.isDownloading = false;
            }
        }

        async connectWebSocketWithRetry(url) {
            return new Promise((resolve, reject) => {
                const connect = (retryCount = 0) => {
                    this.ws = new WebSocket(url);
                    this.setupWebSocketHandlers(resolve, reject, retryCount);
                };
                connect();
            });
        }

        setupWebSocketHandlers(resolve, reject, retryCount) {
            this.ws.binaryType = 'arraybuffer';
            this.chunks = [];
            this.currentVideoMeta = {};

            this.ws.onopen = async () => {
                const initData = JSON.stringify({
                    type: 'init',
                    version: this.pluginVersion,
                    wallpaperEntries: Object.keys(this.cachedWallpapers).map(name => ({ originalName: name }))
                });
                this.ws.send(initData);
            };

            this.ws.onmessage = async (event) => {
                if (typeof event.data === 'string') {
                    const data = JSON.parse(event.data);
                    if (data.type === 'metadata') {
                        this.currentVideoMeta = {
                            ...data,
                            originalName: data.name.replace(/\.mp4$/, '').trim()
                        };
                        this.chunks = [];
                        const cached = await this.getCachedVideo(data.name);
                        if (cached) {
                            this.ws.close();
                            resolve(cached);
                        }
                    }
                } else {
                    this.chunks.push(event.data);
                    const loaded = this.chunks.reduce((acc, chunk) => acc + chunk.byteLength, 0);

                    const progress = Math.min((loaded / this.currentVideoMeta.fileSize) * 100, 100);
                    const filled = Math.min(Math.round(progress / 5), 20);
                    const empty = 20 - filled;
                    const progressBar = `[${'■'.repeat(filled)}${'□'.repeat(empty)}]`;
                    console.log(`Progress: ${progressBar} ${progress.toFixed(1)}%`);

                    if (loaded >= this.currentVideoMeta.fileSize) {
                        this.ws.send(JSON.stringify({ type: 'confirmation' }));
                        await this.finalizeVideoDownload(resolve);
                    }
                }
            };

            this.ws.onclose = async () => {
                if (retryCount < config.ws.retries) {
                    setTimeout(() => connect(retryCount + 1), config.ws.retryDelay);
                } else {
                    reject("Connection failed after retries");
                }
            };

            this.ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                this.ws.close();
                reject(error);
            };
        }

        async finalizeVideoDownload(resolve) {
            try {
                const blob = new Blob(this.chunks, { type: 'video/mp4' });
                const url = URL.createObjectURL(blob);
                await this.saveVideo(this.currentVideoMeta.originalName, blob);
                this.removeVideoElement();

                const container = this.createVideoContainer();
                container.innerHTML = `
                    <video id="fullscreen-bg-video" autoplay muted loop>
                        <source src="${url}" type="video/mp4">
                    </video>
                `;

                await this.applyWallpaper(this.currentVideoMeta.originalName);

                await this.refreshUI();
                this.currentVideoName = this.currentVideoMeta.originalName;
                await this.updateSelects(this.currentVideoName);

                const updatedEntries = await this.getAllCachedWallpapers();
                this.ws.send(JSON.stringify({
                    type: 'sync',
                    entries: Object.values(updatedEntries).map(name => ({ originalName: name }))
                }));

                resolve(url);
            } catch (error) {
                reject(error);
            }
        }

        async executeDB(operation, { key, data } = {}) {
            const db = await this.openDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(config.db.store, 'readwrite');
                const store = tx.objectStore(config.db.store);

                const actions = {
                    get: () => store.get(key),
                    put: () => store.put(data),
                    delete: () => store.delete(key),
                    getAll: () => store.getAll()
                };

                const request = actions[operation]();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }

        openDB() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(config.db.name, 1);
                request.onupgradeneeded = () => {
                    if (!request.result.objectStoreNames.contains(config.db.store)) {
                        const store = request.result.createObjectStore(config.db.store, { keyPath: 'name' });
                    }
                };
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }

        async getCachedVideo(name) {
            const result = await this.executeDB('get', { key: name });
            return result ? URL.createObjectURL(result.blob) : null;
        }

        async saveVideo(name, blob) {
            const cleanedName = name.replace(/\.mp4$/, '').trim();

            await this.executeDB('put', {
                data: {
                    name: cleanedName,
                    originalName: cleanedName,
                    blob: blob
                }
            });
            await this.executeDB('put', {
                data: {
                    name: '__lastUsed__',
                    lastUsed: cleanedName
                }
            });
        }

        async getAllCachedWallpapers() {
            const results = await this.executeDB('getAll');
            return results
                .filter(item => item.name !== '__lastUsed__')
                .reduce((acc, item) => ({
                    ...acc,
                    [item.name]: item.name
                }), {});
        }

        getSettingsPanel() {
            const panel = document.createElement('div');
            panel.id = "videoBackgroundSettings";
            panel.innerHTML = this.generateSettingsHTML();
            this.setupEventListeners(panel);
            this.settingsPanel = panel;
            this.updateSelects(this.getCurrentWallpaperKey());
            return panel;
        }

        generateSettingsHTML() {
            return `
                ${this.generateSection('Apply', 'cachedWallpapers', 'applyWallpaperBtn', 'apply')}
                ${this.generateSection('Delete', 'deleteVideosSelector', 'deleteVideoBtn', 'delete')}
                <div class="ws-connect settings-section">
                    <h2>Connect</h2>
                    <div class="input-section">
                        <input type="text" id="wsUrl" placeholder="${config.ws.defaultUrl}" />
                        <button id="connectWSBtn" class="bd-button">Connect</button>
                    </div>
                </div>
            `;
        }

        generateSection(label, selectId, buttonId, mode) {
            return `
                <div class="settings-section">
                    <h2>${label}</h2>
                    <div class="input-section">
                        <select id="${selectId}">${this.generateOptions(mode)}</select>
                        <button id="${buttonId}" class="bd-button">${label}</button>
                    </div>
                </div>
            `;
        }

        generateOptions(mode) {
            if (mode === 'apply') {
                return Object.keys(this.cachedWallpapers)
                    .map(key => `<option value="${key}">${this.cachedWallpapers[key]}</option>`)
                    .join('');
            }
            return Object.values(this.cachedWallpapers)
                .map(value => `<option value="${value}">${value}</option>`)
                .join('');
        }

        setupEventListeners(panel) {
            panel.querySelector('#applyWallpaperBtn').addEventListener('click', () => {
                const key = panel.querySelector('#cachedWallpapers').value;
                this.applyWallpaper(key);
            });

            panel.querySelector('#deleteVideoBtn').addEventListener('click', async () => {
                const name = panel.querySelector('#deleteVideosSelector').value;
                await this.deleteVideo(name);
            });

            panel.querySelector('#connectWSBtn').addEventListener('click', () => {
                const url = document.getElementById('wsUrl').value || config.ws.defaultUrl;
                this.connectWebSocket(url);
            });
        }

        async applyWallpaper(key) {
            const name = this.cachedWallpapers[key];
            if (!name || name === this.currentVideoName) return;

            const cached = await this.getCachedVideo(key);
            if (!cached) return;

            this.videoURL = cached;
            this.currentVideoName = key;
            this.injectVideo(true);

            await this.executeDB('put', {
                data: { name: '__lastUsed__', lastUsed: key }
            });

            await this.updateSelects(key);

            const videoElement = document.getElementById('fullscreen-bg-video');
            if (videoElement) {
                videoElement.load();
                videoElement.play().catch(error => console.log("Autoplay prevented:", error));
            }
        }

        getCurrentWallpaperKey() {
            return Object.keys(this.cachedWallpapers).find(
                key => key === this.currentVideoName
            );
        }

        async updateSelects(selectedKey) {
            if (this.settingsPanel) {
                const applySelect = this.settingsPanel.querySelector('#cachedWallpapers');
                const deleteSelect = this.settingsPanel.querySelector('#deleteVideosSelector');

                if (applySelect) {
                    applySelect.value = selectedKey;
                    applySelect.dispatchEvent(new Event('change'));
                }

                if (deleteSelect) {
                    deleteSelect.value = this.cachedWallpapers[selectedKey] || '';
                    deleteSelect.dispatchEvent(new Event('change'));
                }
            }
        }

        async deleteVideo(dbName) {
            const isCurrent = (dbName === this.currentVideoName);

            await this.executeDB('delete', { key: dbName });

            if (isCurrent) {
                const available = Object.keys(this.cachedWallpapers).filter(n => n !== dbName);
                if (available.length > 0) {
                    await this.applyWallpaper(available[0]);
                } else {
                    this.removeVideoElement();
                    this.currentVideoName = '';
                    this.videoURL = '';
                }
            }

            await this.refreshUI();
            const updatedEntries = await this.getAllCachedWallpapers();
            this.ws.send(JSON.stringify({
                type: 'sync',
                entries: Object.values(updatedEntries).map(name => ({ originalName: name }))
            }));
        }

        async refreshUI() {
            await this.initCache();
            if (this.settingsPanel) {
                this.settingsPanel.querySelector('#cachedWallpapers').innerHTML = this.generateOptions('apply');
                this.settingsPanel.querySelector('#deleteVideosSelector').innerHTML = this.generateOptions('delete');

                if (this.currentVideoName) {
                    this.settingsPanel.querySelector('#cachedWallpapers').value = this.currentVideoName;
                    this.settingsPanel.querySelector('#deleteVideosSelector').value = this.currentVideoName;
                }
            }
        }

        handleError(error) {
            console.error("Error:", error);
            if (Object.keys(this.cachedWallpapers).length === 0) {
                console.warn("No cached wallpapers available");
            }
        }
    };
})();