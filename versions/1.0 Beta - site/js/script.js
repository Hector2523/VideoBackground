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
let anyVideosSect = document.querySelector('div#videoBackgroundSettings div.settings-section.apply div.any');
let allVideos = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.video video');
let selectedWallpaper = localStorage.getItem('selectedWallpaper');
let lastWallpaper = showWallpapersContainer.lastElementChild;
let arrowRightBtn = document.querySelector('div#videoBackgroundSettings div.showWallpapers div.wallpapersContainer div.right');
let arrowLeftBtn = document.querySelector('div#videoBackgroundSettings div.showWallpapers div.wallpapersContainer div.left');
let deleteButtons = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.bottom div.buttons button.delete-button');
let editButtons = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.bottom div.buttons button.editBtn');
let editNameInputs = document.querySelectorAll('div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.name input');
let marginLeft = 0;
let lastWallpaperVisible = false;
let errors = {
    nameInputEmpty: 'Please enter a name for the video',
    fileInputEmpty: 'Please select a file',
    cacheFailed: 'Failed to save video in cache',
    fileAlreadyDownloaded: 'Video already downloaded',
    invalidCharacters: 'File name contains invalid characters',
    clearErrors: ''
}
let fileName;
let file;
let observer = true;

if (lastWallpaper != undefined) {
    lastWallpaper.classList.add('last');
}

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
    } else if (/^[\/\\\*\?\"\<\>\|]/.test(fileNameInput.value) || /[\x00-\x1F\x7F-\x9F]/.test(fileNameInput.value)) {
        renderErrors(errors.invalidCharacters);
        return console.error('file name contains invalid characters');
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

    const sanitizedName = cacheKey.replace(/[^\x00-\xFF]/g, '_'); // remember

    const response = new Response(fileObj, {
        headers: {
            'Content-Type': fileObj.type,
            'Content-Length': fileObj.size,
            'File-name': sanitizedName
        }
    });

    console.log("Saving with File-name header:", response.headers.get('File-name'));

    try {
        await cache.put(cacheKey, response);
        cancelFile();
        renderVideos(cacheKey);
        wallpapersSection(true);
        console.log(`Video saved in cache with key: ${cacheKey}`);
    } catch (err) {
        console.error("Cache error:", err);
        renderErrors(errors.cacheFailed);
    }
}

function renderErrors(error) {
    submitErrorContainer.textContent = error;
}

function renderVideos(newVideoKey = null) {
    if (!newVideoKey) {
        showWallpapersContainer.innerHTML = '';
    }

    const selectedWallpaperName = localStorage.getItem('selectedWallpaper');

    caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
            caches.open(cacheName).then(async cache => {
                const keys = await cache.keys();
                const sortedKeys = [...keys];

                if (selectedWallpaperName) {
                    console.log(`selectedWallpaperName`)
                    console.log(selectedWallpaperName)
                    sortedKeys.sort((a, b) => {
                        const nameA = decodeURIComponent(new URL(a.url).pathname.split('/').pop());
                        const nameB = decodeURIComponent(new URL(b.url).pathname.split('/').pop());
                        console.log(a)
                        console.log(b)
                        console.log(nameA)
                        console.log(nameB)
                        console.log(nameA === selectedWallpaperName)
                        if (nameA === selectedWallpaperName) return -1;
                        if (nameB === selectedWallpaperName) return 1;
                        return 0;
                    });
                }

                for (const request of sortedKeys) {
                    const name = decodeURIComponent(request.url.split('/').pop());

                    if (newVideoKey && name !== newVideoKey) {
                        continue;
                    }

                    const existingVideos = document.querySelectorAll(`div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper[value="${name}"]`);
                    if (existingVideos.length > 0) {
                        continue;
                    }

                    const response = await cache.match(request);
                    if (response) {
                        console.log("Response File-name header:", response.headers.get('File-name'));

                        const blob = await response.blob();
                        const videoURL = URL.createObjectURL(blob);

                        console.log("Key Name:", name);
                        console.log("Request URL:", request.url);
                        console.log("Blob:", blob);

                        if (name === selectedWallpaperName) {
                            console.log('selected')
                            new Wallpaper(videoURL, name, 'selected');
                        } else {
                            new Wallpaper(videoURL, name);
                        }
                    }
                }
            });
        });
    });
}

function cancelFile() {
    file = undefined;
    fileName = undefined;
    fileNameInput.value = '';
    uploader.classList.remove('uploaded');
    renderErrors(errors.clearErrors);
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
        disableArrowBtns('right', true)
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

async function disableArrowBtns(btn, val) {
    if ((marginLeft == 0 || marginLeft > 0) && btn == 'left') {
        arrowLeftBtn.classList.add('disabled');
        arrowRightBtn.classList.remove('disabled');
        await new Promise(resolve => setTimeout(resolve, 250))
    } else if ((marginLeft == 0 || marginLeft < 0) && btn == 'right') {
        console.log(`margin: ${marginLeft}`)
        if (showWallpapers.offsetWidth > showWallpapersContainer.offsetWidth) {
            arrowRightBtn.classList.add('disabled');
            await new Promise(resolve => setTimeout(resolve, 250))
            arrowRightBtn.classList.add('none');
        } else if (showWallpapers.offsetWidth < showWallpapersContainer.offsetWidth && val) {
            arrowRightBtn.classList.add('disabled');
            await new Promise(resolve => setTimeout(resolve, 250))
        }
    }
}

class Wallpaper {
    constructor(videoURL, videoName, elementClass) {
        if (videoURL == undefined) {
            console.log('undefined')
            return;
        }

        fetch(videoURL).then(response => {
            if (response.ok) {
                const template = `<div class="wallpaper ${elementClass ? (typeof elementClass === 'string' ? elementClass : '') : ''}" value="${videoName}">
                            <div class="selected">
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 102.97">
                                    <path class="cls-1"
                                        d="M4.82,69.68c-14.89-16,8-39.87,24.52-24.76,5.83,5.32,12.22,11,18.11,16.27L92.81,5.46c15.79-16.33,40.72,7.65,25.13,24.07l-57,68A17.49,17.49,0,0,1,48.26,103a16.94,16.94,0,0,1-11.58-4.39c-9.74-9.1-21.74-20.32-31.86-28.9Z" />
                                </svg>
                            </div>
                            <div class="video">
                                <video src="${videoURL}" muted loop></video>
                            </div>
                            <div class="bottom">
                                <div class="name">
                                    <input value="${videoName}" type="text" class="editInput">
                                </div>
                                <div class="buttons">
                                    <button aria-label="Delete item" class="delete-button">
                                        <svg class="trash-svg" viewBox="0 -10 64 74" xmlns="http://www.w3.org/2000/svg">
                                            <g id="trash-can">
                                                <rect x="16" y="24" width="32" height="30" rx="3" ry="3" fill="#e74c3c"></rect>
                                        
                                                <g transform-origin="12 18" id="lid-group">
                                                    <rect x="12" y="12" width="40" height="6" rx="2" ry="2" fill="#c0392b"></rect>
                                                    <rect x="26" y="8" width="12" height="4" rx="2" ry="2" fill="#c0392b"></rect>
                                                </g>
                                            </g>
                                        </svg>
                                      </button>
                                      <button class="editBtn">
                                        <svg height="1em" viewBox="0 0 512 512">
                                          <path
                                            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                          ></path>
                                        </svg>
                                      </button>
                                </div>
                            </div>
                        </div>`.replaceAll(/\n\s+/g, ' ').trim();

                addWallpaper(template);
            } else {
                console.warn('Error: ' + response.status);
            }
        }).catch(error => {
            console.warn('Error: ' + error);
        });
    }
}

async function addWallpaper(element) {
    if (lastWallpaper) {
        lastWallpaper.classList.remove('last');
    }

    showWallpapersContainer.innerHTML += element;

    await updateVariables();

    lastWallpaper.classList.add('last');

    disableArrowBtns('left');
    disableArrowBtns('right');
    addEventsForVideos();
}

function addEventsForVideos() {
    let hoverTimers = [];

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const wallpaper = button.closest('.wallpaper');
            let name = wallpaper.getAttribute('value');
            console.log(name)
            deleteVideo(name);
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const wallpaper = button.closest('.wallpaper');
            let name = wallpaper.getAttribute('value');
            let editInput = wallpaper.querySelector('.editInput');
            editVideoName(name, editInput);
        })
    })

    editNameInputs.forEach(input => {
        const div = input.closest('.name');
        div.addEventListener('dblclick', () => {
            console.log('double click detected');
            let wallpaper = input.closest('.wallpaper');

            if (!wallpaper) {
                console.error('Could not find parent wallpaper element');
                return;
            }

            console.log(wallpaper);
            let name = wallpaper.getAttribute('value');
            editVideoName(name, input);
        });
    });

    wallpapers.forEach((wallpaper, index) => {
        wallpaper.addEventListener('mouseover', () => {
            if (allVideos[index]) {
                if (hoverTimers[index]) {
                    clearTimeout(hoverTimers[index]);
                }

                hoverTimers[index] = setTimeout(() => {
                    allVideos[index].play();
                    console.log('Playing video', index);
                }, 200);
            }
        });

        wallpaper.addEventListener('mouseout', () => {
            if (allVideos[index]) {
                if (hoverTimers[index]) {
                    clearTimeout(hoverTimers[index]);
                }

                allVideos[index].pause();
                allVideos[index].currentTime = 0;
            }
        });

        wallpaper.addEventListener('click', (event) => {
            const buttons = event.target.closest('.buttons');
            const input = event.target.closest('.editInput');
            
            if (buttons || input) {
                return;
            }
            
            selectWallpaper(wallpaper);
        });
    });
}

function deleteVideo(videoName) {
    caches.open(videoCache).then(async cache => {
        const keys = await cache.keys();

        for (const key of keys) {
            const name = decodeURIComponent(new URL(key.url).pathname.split('/').pop());
            if (name === videoName) {
                cache.delete(key);
                updateVariables();
                disableArrowBtns('left');
                renderVideos();


                if (name === localStorage.getItem('selectedWallpaper')) {
                    localStorage.removeItem('selectedWallpaper');
                }

                marginLeft = 0;
                showWallpapersContainer.style.marginLeft = `${marginLeft}px`;
                lastWallpaperVisible = false;

                break;
            }
        }

        const remainingKeys = await cache.keys();

        if (remainingKeys.length === 0) {
            wallpapersSection(false);
            return;
        }
    });
}

function editVideoName(wallpaper, inputElement) {
    let oldName = wallpaper;
    let input = inputElement;
    let inputLength = input.value.length;

    input.disabled = false;
    input.focus();
    input.setSelectionRange(inputLength, inputLength);


    const inputHandler = () => {
        console.log('inputed');
    };

    const finishEditing = async () => {
        const newName = input.value.trim();
        if (newName === oldName || newName === '' || 
            /^[\/\\\*\?\"\<\>\|]/.test(newName) || 
            /[\x00-\x1F\x7F-\x9F]/.test(newName)) {
            input.value = oldName;
        } else {
            await updateVideoName(oldName, newName);
        }

        input.removeEventListener('input', inputHandler);
        input.removeEventListener('blur', finishEditing);
        input.removeEventListener('keydown', keyHandler);
    };

    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            input.blur();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            input.value = oldName;
            input.blur();
        }
    };

    input.addEventListener('input', inputHandler);
    input.addEventListener('blur', finishEditing);
    input.addEventListener('keydown', keyHandler);
}

async function updateVideoName(oldName, newName) {
    try {
        const cache = await caches.open(videoCache);
        const keys = await cache.keys();

        for (const key of keys) {
            const name = decodeURIComponent(new URL(key.url).pathname.split('/').pop());
            if (name === oldName) {
                const response = await cache.match(key);
                const blob = await response.blob();

                const newResponse = new Response(blob, {
                    headers: {
                        'Content-Type': response.headers.get('Content-Type'),
                        'Content-Length': response.headers.get('Content-Length'),
                        'File-name': newName
                    }
                });

                if(oldName === localStorage.getItem('selectedWallpaper')) {
                    localStorage.setItem('selectedWallpaper', newName);
                }

                await cache.delete(key);
                await cache.put(newName, newResponse);

                renderVideos();
                console.log(`Video name updated from "${oldName}" to "${newName}"`);
                break;
            }
        }
    } catch (error) {
        console.error('Error updating video name:', error);
    }
}

function wallpapersSection(show) {
    if (show) {
        anyVideosSect.classList.add('disable');
        showWallpapers.classList.add('show');
        return;
    }

    anyVideosSect.classList.remove('disable');
    showWallpapers.classList.remove('show');
}

function selectWallpaper(wallpaper) {
    let name = wallpaper.getAttribute('value');
    if(name === localStorage.getItem('selectedWallpaper')) {
        localStorage.setItem('selectedWallpaper', undefined);
        renderVideos();
        return; 
    }
    localStorage.setItem('selectedWallpaper', name);
    console.log(showWallpapersContainer.innerHTML);
    renderVideos();
}

async function updateVariables() {
    wallpapers = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper');
    lastWallpaper = showWallpapersContainer.lastElementChild;
    selectedWallpaper = localStorage.getItem('selectedWallpaper');
    allVideos = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.video video');
    deleteButtons = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.bottom div.buttons button.delete-button');
    editButtons = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.bottom div.buttons button.editBtn');
    editNameInputs = document.querySelectorAll('div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.name input');

    let keys = await caches.keys();

    if (keys.length == 1 && !localStorage.getItem('selectedWallpaper')) {
        const firstWallpaper = showWallpapersContainer.firstElementChild;
        if (firstWallpaper) {
            selectWallpaper(firstWallpaper);
        }
    }
}

caches.open(videoCache).then(async (cache) => {
    cache.keys().then(keys => {
        if (keys.length == 0) {
            return;
        }
        renderVideos();
        wallpapersSection(true);
    })
})

disableArrowBtns('left');
disableArrowBtns('right');