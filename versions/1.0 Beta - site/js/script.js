const version = 1;
const videoCache = `videoCache-v${version}`;
let fileNameInput = document.querySelector('div#videoBackgroundSettings div.name input#nameOfFile');
let uploader = document.querySelector('div#videoBackgroundSettings div.file div.upload');
let form = document.querySelector('div#videoBackgroundSettings form');
let showUploadVideoName = document.querySelector('div#videoBackgroundSettings div.file div.upload div.uploadedSect p.uploadedVideoName span.content');
let submitErrorContainer = document.querySelector('div#videoBackgroundSettings form div.submit p.error');
let showWallpapers = document.querySelector('div#videoBackgroundSettings div.showWallpapers');
let showWallpapersContainer = document.querySelector('div#videoBackgroundSettings div.showWallpapers div.container');
let wallpapers = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper');
let firstWallpaper = showWallpapersContainer.firstElementChild;
let lastWallpaper = showWallpapersContainer.lastElementChild;
let arrowRightBtn = document.querySelector('div#videoBackgroundSettings div.showWallpapers div.wallpapersContainer div.right');
let arrowLeftBtn = document.querySelector('div#videoBackgroundSettings div.showWallpapers div.wallpapersContainer div.left');
let marginLeft = 0;
let lastWallpaperVisible = false;
let errors = {
    nameInputEmpty: 'Please enter a name for the video',
    fileInputEmpty: 'Please select a file',
    cacheFailed: 'Failed to save video in cache',
    fileAlreadyDownloaded: 'Video already downloaded'
}
let fileName;
let file;
let observer = true;

lastWallpaper.classList.add('last');

sessionStorage.setItem('videoBackgroundUserInputName', false);

fileNameInput.addEventListener('input', () => {
    if (fileNameInput.value.trim() == '') {
        sessionStorage.setItem('videoBackgroundUserInputName', false);
        showUploadVideoName.textContent = fileNameInput.value.trim();
        return;
    }
    if (file !== undefined) {
        showUploadVideoName.textContent = fileNameInput.value.trim();
    }
    sessionStorage.setItem('videoBackgroundUserInputName', true);
})

caches.keys().then(keys => {
    Promise.all(
        keys.filter(key => key !== videoCache).map(key => caches.delete(key))
    )
})

uploader.addEventListener('click', (event) => {
    if (event.target.closest('div#videoBackgroundSettings form div.close')) {
        return cancelFile();
    }
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.click();
    uploader.classList.add('active');
    input.addEventListener('change', async (value) => {
        uploader.classList.remove('active');
        uploader.classList.add('uploaded');
        let input = value.target;
        file = input.files[0];
        fileName = file.name.split('.').slice(0, -1).join('.');
        modifyName(fileName)
    })
})

document.addEventListener('click', (event) => {
    if (event.target.closest('div#videoBackgroundSettings div.file')) {
        return;
    } else if (file == undefined) {
        return uploader.classList.remove('active');
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (fileNameInput.value.trim() == '') {
        renderErrors(errors.nameInputEmpty);
        return console.error('file name is empty');
    } else if (file == undefined) {
        renderErrors(errors.fileInputEmpty);
        return console.error('file is undefined');
    }
    submitErrorContainer.textContent = '';
    console.log('submited')
    createResponseObject();
})

function modifyName(newName) {
    const hasUserInput = sessionStorage.getItem('videoBackgroundUserInputName') === 'true';
    const isInputEmpty = fileNameInput.value.trim() === '';

    if (isInputEmpty || !hasUserInput) {
        fileNameInput.value = newName;
        showUploadVideoName.textContent = newName;
    } else {
        showUploadVideoName.textContent = fileNameInput.value.trim();
    }
}

async function createResponseObject() {
    let response = new Response(file, {
        status: 200,
        statusText: 'OK',
        headers: {
            'Content-Type': file.type,
            'Content-Length': file.size,
        }
    })

    let copy = response.clone();
    console.log('response object')
    console.log(copy);
    let blob = await copy.blob();
    console.log(blob);
    let url = URL.createObjectURL(blob);
    console.log(url)
    saveInCache(file);
}

async function saveInCache(fileObj) {
    const cacheKey = fileNameInput.value.trim();
    const cache = await caches.open(videoCache);
    const keys = await cache.keys();

    const fileExists = keys.some(key => {
        const cachedFileName = decodeURIComponent(new URL(key.url).pathname.split('/').pop());
        return cachedFileName.match(new RegExp(`^${cacheKey}$`, 'i'));
    });

    if (fileExists) {
        renderErrors(errors.fileAlreadyDownloaded);
        return;
    }

    const response = new Response(fileObj, {
        headers: {
            'Content-Type': fileObj.type,
            'Content-Length': fileObj.size
        }
    });

    try {
        await cache.put(cacheKey, response);
        renderVideos();
        console.log(`Video saved in cache with key: ${cacheKey}`);
    } catch (err) {
        renderErrors(errors.cacheFailed);
    }
}

function renderErrors(error) {
    submitErrorContainer.textContent = error;
}

function renderVideos() {
    const videoContainer = document.createElement('div');
    videoContainer.id = 'videoContainer';
    document.body.appendChild(videoContainer);

    caches.open(videoCache).then(cache => {
        cache.keys().then(keys => {
            keys.forEach(async key => {
                const response = await cache.match(key);
                const blob = await response.blob();
                const videoURL = URL.createObjectURL(blob);

                const video = document.createElement('video');
                const source = document.createElement('source');
                source.src = videoURL;
                source.type = blob.type;

                video.appendChild(source);
                video.controls = true;
                video.style.width = '100%';
                video.style.maxWidth = '600px';
                video.style.margin = '10px';

                videoContainer.appendChild(video);
            });
        });
    });
}

// renderVideos();

function cancelFile() {
    file = undefined;
    fileName = undefined;
    fileNameInput.value = '';
    uploader.classList.remove('uploaded');
    sessionStorage.setItem('videoBackgroundUserInputName', false);
}

let lastClickTime = 0;
const clickInterval = 250;

arrowLeftBtn.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime > clickInterval) {
        lastClickTime = now;
        moveWallpapers('left');
    }
})

arrowRightBtn.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime > clickInterval) {
        lastClickTime = now;
        moveWallpapers('right');
    }
})

async function moveWallpapers(direction) {
    let each = wallpapers[0].offsetWidth + 5;
    let verify = await observeLastWallpaper();

    if (!verify && direction === 'right' && !lastWallpaperVisible) {
        disableArrowBtns('right')
        marginLeft += 70;
        showWallpapersContainer.style.marginLeft = `${marginLeft}px`;
        lastWallpaperVisible = true;
        return;
    }

    if (direction === 'left') {
        if (marginLeft == 0 || marginLeft > 0) {
            marginLeft = 0;
            showWallpapersContainer.style.marginLeft = `${marginLeft}px`;
            disableArrowBtns('left')
            return;
        }
        marginLeft += each;
    } else if (direction === 'right' && verify) {
        arrowLeftBtn.classList.remove('none');
        await new Promise(resolve => setTimeout(resolve, 250))
        arrowLeftBtn.classList.remove('disabled');
        marginLeft -= each;
    }

    showWallpapersContainer.style.marginLeft = `${marginLeft}px`;
}

async function observeLastWallpaper() {
    return new Promise((resolve) => {
        const wallpaper = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio === 1) {
                    observer.disconnect();
                    resolve(false);
                } else {
                    lastWallpaperVisible = false;
                    resolve(true);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        });

        wallpaper.observe(lastWallpaper);
    });
}

async function disableArrowBtns(btn) {
    if (marginLeft == 0 || marginLeft > 0 && btn == 'left') {
        arrowLeftBtn.classList.add('disabled');
        arrowRightBtn.classList.remove('disabled');
        await new Promise(resolve => setTimeout(resolve, 250))
        arrowLeftBtn.classList.add('none');
    } else if (marginLeft == 0 || marginLeft > 0 && btn == 'right') {
        if (showWallpapers.offsetWidth > showWallpapersContainer.offsetWidth) {
            arrowRightBtn.classList.add('disabled');
            await new Promise(resolve => setTimeout(resolve, 250))
            arrowRightBtn.classList.add('none');
        }
    } else if (marginLeft < 0 && btn == 'right') {
        arrowRightBtn.classList.add('disabled');
        await new Promise(resolve => setTimeout(resolve, 250))
        arrowRightBtn.classList.add('none');
    }
}

function addWallpaper() {
    lastWallpaper.classList.remove('last');
    showWallpapersContainer.appendChild(wallpapers[0].cloneNode(true));
    lastWallpaper = showWallpapersContainer.lastElementChild;
    lastWallpaper.classList.add('last');
}

firstWallpaper.classList.add('first');

disableArrowBtns('left');
disableArrowBtns('right');