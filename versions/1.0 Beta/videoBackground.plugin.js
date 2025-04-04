/**
 * @name VideoBackground
 * @author Hector
 * @version 1.0 Beta
 * @description Live Video Background!
 */

let open = false;

(function () {
    const mainCSS = `
      body, #app-mount, .appMount__51fd7 {
        background: transparent !important;
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

    const panelStyle = `
    :root {
    /* Background colors */
    --color-bg-primary: rgba(20, 20, 20, 0.65);
    --color-bg-dark: rgba(28, 28, 30, 0.807);
    --color-bg-wallpaper: rgba(32, 32, 32, 0.75);
    --color-bg-transparent: transparent;
    --color-bg-input-focus: rgba(255, 255, 255, 0.1);
    
    /* Text colors */
    --color-text-primary: #fff;
    --color-text-secondary: rgba(245, 245, 245, 0.861);
    --color-text-wallpaper: rgb(209, 209, 209);
    --color-text-error: rgb(235, 49, 49);
    --color-text-wallpapers: white;
    
    /* Button colors */
    --color-button-primary: #5462ea;
    --color-button-hover: #3E62E3;
    --color-button-text: rgb(61, 58, 58);
    --color-button-text-hover: rgb(20, 19, 19);
    --color-close-button-outside-shadow-color: transparent;
    --color-svg-upload-close-button: rgba(219, 219, 219, 0.822);
    --color-svg-upload-close-hover-button: rgb(255, 255, 255);
    
    /* Icon colors */
    --color-icon-primary: rgb(211, 211, 211);
    --color-icon-arrow: rgb(43, 41, 41);
    --color-icon-selected: #10a64a;
    
    /* UI element colors */
    --color-close-button-bg: transparent;
    --color-close-button-border: transparent;
    --color-upload-border: rgb(82, 82, 82);
    --color-arrow-bg: #ffffff80;
    --color-arrow-hover: #dbdbdbd3;
    
    /* Shadow colors */
    --color-shadow-primary: rgba(0, 0, 0, 0.5);
    --color-shadow-hover: rgba(135, 207, 235, 0.186);
    --color-shadow-focus: skyblue;
    --color-shadow-wallpaper: rgba(0, 0, 0, 0.2);
    --color-shadow-arrow: rgba(0, 0, 0, 0.486);
    --color-shadow-trash: rgba(0, 0, 0, 0.1);
    
    /* Legacy variables (kept for compatibility) */
    --video-background-settings-bg-color: var(--color-bg-primary);
    --setings-section-h2-colorlight: black;
    --setings-section-h2-colordark: var(--color-text-secondary);
    --setings-section-button-bgcolordark: var(--color-button-primary);
    --setings-section-button-hover-bgcolordark: var(--color-button-hover);
    --setings-section-button-colordark: var(--color-button-text);
    --setings-section-button-hover-colordark: var(--color-button-text-hover);
    --inputs-text-color: var(--color-text-primary);
    --color-transparent: transparent;
    --background-tertiary-color: rgba(25, 25, 25, 0);
    --background-primary-color: transparent;
    --background-secondary-color: transparent;
    --background-secondary-alt-color: transparent;
    --channeltextarea-background-color: transparent;
}

#app-mount {
    position: relative;
}

div#videoBackgroundSettings {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: 30vw;
    height: 45vh;
    padding: 2vmin;
    gap: 1.5vmin;
    backdrop-filter: blur(10px);
    background-color: var(--color-bg-primary);
    border-radius: 16px;
}

div#videoBackgroundSettings div.settings-section {
    display: flex;
    flex-direction: column;
    gap: 1vmin;
}

div#videoBackgroundSettings div.settings-section.download {
    height: 60%;
    margin-top: 4.5vmin;
}

div#videoBackgroundSettings div.settings-section.apply {
    height: 40%;
}

div#videoBackgroundSettings div.settings-section>h2 {
    color: var(--color-text-secondary);
    font-size: 16px;
    line-height: 16px;
    margin-top: 1vmin;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

div#videoBackgroundSettings div.settings-section.apply div.any {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

div#videoBackgroundSettings div.settings-section.apply div.any.disable {
    display: none;
}

div#videoBackgroundSettings div.settings-section.apply div.any p {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-error);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers {
    display: none;
    height: 100%;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers.show {
    display: block;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.tittle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5vmin;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.tittle p {
    color: var(--color-text-wallpapers);
    font-size: 16px;
    line-height: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers h2 {
    color: var(--color-text-wallpapers);
    font-size: 24px;
    line-height: 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer {
    position: relative;
    width: 100%;
    height: 120%;
    display: flex;
    align-items: center;
    border-radius: .4vw;
    position: relative;
    overflow: hidden;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container {
    position: relative;
    width: max-content;
    height: 90%;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 10% 10px;
    gap: 10px;
    transition: .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: .4vw;
    height: 80%;
    width: 212px;
    background-color: var(--color-bg-wallpaper);
    box-shadow: 0px 0px 10px var(--color-shadow-wallpaper);
    cursor: pointer;
    border-radius: .4vw;
    transform: translateZ(0);
    transition: .4s;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper:hover {
    box-shadow: 0px 0px 15px rgba(126, 119, 119, 0.6);
    transform: translate3d(0, -.5rem, 1rem);
    perspective: 100px;
    transform-style: preserve-3d;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.selected {
    display: none;
    position: absolute;
    top: 10%;
    right: 2.5%;
    transform: translateY(-50%);
    height: 18px;
    width: 18px;
    overflow: hidden;
    z-index: 999;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper.selected div.selected {
    display: flex;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.selected svg {
    height: 100%;
    width: 100%;
    fill: var(--color-icon-selected);
    pointer-events: none;
}


div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.video {
    position: relative;
    height: 80%;
    width: 100%;
    border-radius: .4vw;
    object-position: center center;
    overflow: hidden;
    z-index: 777;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.video img,
div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.video video {
    object-position: center center;
    min-height: 100%;
    min-width: 100%;
    max-height: 110%;
    max-width: 110%;
    transition: .4s cubic-bezier(0.215, 0.610, 0.355, 1);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper:hover div.video img,
div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper:hover div.video video {
    scale: 1.05;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom {
    height: 15%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform-style: preserve-3d;
    position: relative;
    z-index: 5;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom div.buttons {
    height: 100%;
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: .25vmin;
    transform-style: preserve-3d;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .delete-button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1em;
    transition: transform 0.2s ease;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .trash-svg {
    width: 22px;
    height: 100%;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    overflow: visible;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom #lid-group {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .delete-button:hover #lid-group {
    transform: rotate(-28deg) translateY(2px);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .delete-button:active #lid-group {
    transform: rotate(-12deg) scale(0.98);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .delete-button:hover .trash-svg {
    transform: scale(1.08) rotate(3deg);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .delete-button:active .trash-svg {
    transform: scale(0.96) rotate(-1deg);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .editBtn {
    width: 22px;
    height: 55px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    background: transparent;
    transform-style: preserve-3d;
    transform: translateZ(0.1px);
    z-index: 10;
    pointer-events: auto;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .editBtn:active {
    transform: scale(0.96) translateZ(0.1px);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .editBtn::before {
    content: "";
    width: 200%;
    height: 200%;
    position: absolute;
    z-index: 1;
    transform: scale(0) translateZ(0);
    transition: all 0.3s;
    border-radius: 50%;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .editBtn:hover::before {
    transform: scale(1);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .editBtn svg {
    height: 14px;
    fill: var(--color-icon-primary);
    z-index: 3;
    transition: all 0.2s;
    transform-origin: bottom;
    background: transparent;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .editBtn:hover svg {
    transform: rotate(-15deg) translateX(5px);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .editBtn:active {
    transform: rotate(-12deg) translateX(5px);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .editBtn::after {
    content: "";
    width: 10px;
    height: 1.2px;
    position: absolute;
    bottom: 19px;
    left: -5px;
    background-color: var(--color-icon-primary);
    border-radius: 2px;
    z-index: 2;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease-out;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.bottom .editBtn:hover::after {
    transform: scaleX(1);
    left: 0px;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.name {
    overflow: hidden;
    display: flex;
    align-items: center;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.name input {
    font-size: 14px;
    line-height: 16px;
    max-width: 95%;
    color: var(--color-text-wallpaper);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    pointer-events: none;
    background-color: transparent;
    border: transparent;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    background: none;
    outline: none;
    border: none;
    transition: .4s;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.name input:focus {
    pointer-events: all;
    background-color: var(--color-bg-input-focus);
    border: 1px solid var(--color-button-primary);
}

div#videoBackgroundSettings div.settings-section div.uploadContainer {
    height: 100%;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer form {
    display: flex;
    flex-direction: column;
    gap: 1vmin;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.name input {
    height: 2.5vmin;
    font-weight: 500;
    width: 100%;
    font-size: .8vw;
    color: var(--color-text-primary);
    background-color: var(--color-bg-dark);
    box-shadow: 0 0 .4vw var(--color-shadow-primary), 0 0 0 .15vw var(--color-bg-transparent);
    border-radius: 0.4vw;
    border: none;
    outline: none;
    padding: 0.4vw 0;
    text-indent: 0.4vw;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    transition: .4s;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.name input:hover {
    box-shadow: 0 0 0 .15vw var(--color-shadow-hover);
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.name input:focus {
    box-shadow: 0 0 0 .15vw var(--color-shadow-focus);
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload {
    margin-top: .5vmin;
    border: 2px dashed var(--color-upload-border);
    cursor: pointer;
    height: 3vmin;
    font-weight: 500;
    width: 99.3%;
    font-size: .8vw;
    color: var(--color-text-primary);
    background-color: var(--color-bg-dark);
    box-shadow: 0 0 .4vw var(--color-shadow-primary), 0 0 0 .15vw var(--color-bg-transparent);
    border-radius: 0.4vw;
    outline: none;
    padding: 0.4vw 0;
    transition: .4s;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload:hover {
    box-shadow: 0 0 0 .15vw var(--color-shadow-hover);
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload.active {
    box-shadow: 0 0 0 .15vw var(--color-shadow-focus);
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload>div.container {
    padding: 0 1vmin;
    height: 100%;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadSect,
div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadedSect {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1vmin;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload.uploaded div.container div.uploadSect,
div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadedSect {
    display: none;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload.uploaded div.container div.uploadedSect {
    display: flex;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadedSect div.content {
    height: 100%;
    width: 100%;
    display: inline-flex;
    align-items: center;
    gap: 1vmin;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadedSect div.close {
    display: flex;
    align-items: center;
    height: 100%;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadedSect div.close div.button {
    position: relative;
    width: 20px;
    height: 20px;
    background-color: var(--color-close-button-bg);
    border-radius: 50%;
    box-shadow: 0px 0px 0px 2px var(--color-close-button-border);
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadedSect div.close:hover div.button {
    scale: 1.1;
    box-shadow: 0px 0px 0px 4px var(--color-close-button-outside-shadow-color);
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadedSect div.close div.button span.symbol svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 90%;
    color: var(--color-svg-upload-close-button);
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadedSect div.close:hover div.button span.symbol svg {
    transform: translate(-50%, -50%) scale(1.2);
    color: var(--color-svg-upload-close-hover-button);
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container div.uploadedSect svg.single {
    fill: var(--setings-section-h2-colordark);
    width: auto;
    height: 90%;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.upload div.container p {
    font-size: 1.5vmin;
    line-height: 1.5vmin;
    color: var(--setings-section-h2-colordark);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.submit {
    display: flex;
    flex-direction: column;
    margin-top: .25vmin;
    gap: 1vmin;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.submit p {
    align-self: flex-end;
    margin: 0;
    color: var(--color-text-error);
    font-weight: 600;
    font-size: 1.35vmin;
    line-height: 1.35vmin;
    height: auto;
    margin-right: .4vw;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.submit button {
    cursor: pointer;
    height: 3.2vmin;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: var(--color-button-primary);
    border: 2px solid var(--color-button-primary);
    overflow: hidden;
    border: 0;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    user-select: none;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    transition: .4s;
}

div#videoBackgroundSettings div.settings-section div.uploadContainer div.submit button:hover {
    background-color: var(--color-button-hover);
    color: var(--color-button-text-hover);
}

/* Using CSS for icon */

.gg-software-upload {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 16px;
    height: 6px;
    border: 2px solid;
    border-top: 0;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-top: 8px;
    color: var(--color-text-secondary);
}

.gg-software-upload::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 8px;
    height: 8px;
    border-left: 2px solid;
    border-top: 2px solid;
    transform: rotate(45deg);
    left: 2px;
    bottom: 4px;
}

.gg-software-upload::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-radius: 3px;
    width: 2px;
    height: 10px;
    background: var(--color-text-secondary);
    left: 5px;
    bottom: 3px;
}

/* arrows */

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.right,
div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.left {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 35px;
    width: 35px;
    background-color: var(--color-arrow-bg);
    box-shadow: 0px 0px 5px var(--color-shadow-arrow);
    border-radius: 50%;
    cursor: pointer;
    z-index: 999;
    transition: .2s ease-in-out;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.right.disabled,
div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.left.disabled {
    opacity: 0;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.right.disabled.none,
div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.left.disabled.none {
    display: none;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.right {
    right: 2%;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.left {
    left: 2%;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.right:hover,
div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.left:hover {
    height: 40px;
    width: 40px;
    background-color: var(--color-arrow-hover);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.right span.symbol,
div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.left span.symbol {
    display: inline;
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.right span.symbol svg,
div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.left span.symbol svg {
    fill: var(--color-icon-arrow);
    height: 24px;
    width: 24px;
    scale: 1;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
}

div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.right:hover span.symbol svg,
div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.left:hover span.symbol svg {
    fill: var(--color-icon-arrow);
}
`;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(mainCSS));
    style.appendChild(document.createTextNode(panelStyle));
    document.head.appendChild(style);
})();

module.exports = class VideoBackground {
    constructor() {
        this.initialized = false;
    }

    start() {
        console.log("VideoBackground started");
    }

    stop() {
        console.log("VideoBackground stopped");
    }

}

if ('storage' in navigator) {

    if (!document.querySelector("#videoBackgroundSettings")) {
        let html = `
            <div class="settings-section apply">
                <div class="any">
                    <p class="any">You haven't wallpapers installed!</p>
                </div>
                    <div class="showWallpapers">
                        <div class="tittle">
                        <h2>Wallpapers</h2>
                        <p class="sotarage"><span class="used"></span> used of <span class="total"></span></p>
                    </div>
                    <div class="wallpapersContainer">
                        <div class="left">
                            <div class="button">
                                <span class="symbol">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div class="container">
                            
                        </div>
                        <div class="right">
                            <div class="button">
                                <span class="symbol">
                                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="settings-section download">
                <h2>Upload</h2>
                <div class="uploadContainer">
                    <form action="" method="post" autocomplete="off">
                        <div class="name">
                            <input type="text" id="nameOfFile" placeholder="Name" maxlength="60">
                        </div>
                        <div class="file">
                            <div class="upload">
                                <div class="container">
                                    <div class="uploadSect">
                                        <span class="gg-software-upload"></span>
                                        <p>Upload a video</p>
                                    </div>
                                    <div class="uploadedSect">
                                        <div class="content">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="single">
                                                <path d="M9.5 9.38455V14.6162C9.5 15.1858 10.1099 15.5475 10.6097 15.2743L15.3959 12.6582C15.9163 12.3737 15.9162 11.6263 15.3958 11.3419L10.6097 8.72641C10.1099 8.45328 9.5 8.81499 9.5 9.38455ZM5.25 3C3.45507 3 2 4.45507 2 6.25V17.75C2 19.5449 3.45507 21 5.25 21H18.75C20.5449 21 22 19.5449 22 17.75V6.25C22 4.45507 20.5449 3 18.75 3H5.25ZM3.5 6.25C3.5 5.2835 4.2835 4.5 5.25 4.5H18.75C19.7165 4.5 20.5 5.2835 20.5 6.25V17.75C20.5 18.7165 19.7165 19.5 18.75 19.5H5.25C4.2835 19.5 3.5 18.7165 3.5 17.75V6.25Z"/>
                                            </svg>
                                            <p class="uploadedVideoName">Name: <span class="content"></span></p>
                                        </div>
                                        <div class="close">
                                            <div class="button">
                                                <span class="symbol">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="submit">
                            <p class="error"></p>
                            <button>Upload</button>
                        </div>
                    </form>
                </div>
            </div>`;

        const settingsPanel = document.createElement('div');
        settingsPanel.id = 'videoBackgroundSettings';
        settingsPanel.innerHTML = html;
        document.querySelector('body').appendChild(settingsPanel);
    }

    const videoBackgroundSettings = document.querySelector('div#videoBackgroundSettings');

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
    let lastWallpaper = showWallpapersContainer.lastElementChild;
    let arrowRightBtn = document.querySelector('div#videoBackgroundSettings div.showWallpapers div.wallpapersContainer div.right');
    let arrowLeftBtn = document.querySelector('div#videoBackgroundSettings div.showWallpapers div.wallpapersContainer div.left');
    let deleteButtons = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.bottom div.buttons button.delete-button');
    let editButtons = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.bottom div.buttons button.editBtn');
    let editNameInputs = document.querySelectorAll('div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.name input');
    let showMemoryUsed = document.querySelector('div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.tittle p.sotarage span.used');
    let showMemoryTotal = document.querySelector('div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.tittle p.sotarage span.total');
    let marginLeft = 0;
    let lastWallpaperVisible = false;
    let errors = {
        nameInputEmpty: 'Please enter a name for the video',
        fileInputEmpty: 'Please select a file',
        cacheFailed: 'Failed to save video in cache',
        fileAlreadyDownloaded: 'Video already downloaded',
        invalidCharacters: 'File name contains invalid characters',
        outOfMemory: 'Less than 1GB of free space left on the device',
        clearErrors: ''
    }
    let fileName;
    let file;

    let lastClickTimes = {};
    const clickInterval = 250;

    function preventRapidClicks(elementId) {
        const now = Date.now();
        if (!lastClickTimes[elementId] || now - lastClickTimes[elementId] > clickInterval) {
            lastClickTimes[elementId] = now;
            return true;
        }
        return false;
    }

    function updateStorage() {
        navigator.storage.estimate().then(({ usage, quota }) => {
            console.log(`Using ${usage} out of ${quota} bytes.`);

            let usedValue, usedUnit;
            if (usage >= 1024 * 1024 * 1024 * 1024) {
                // TB
                usedValue = Math.round(usage / 1024 / 1024 / 1024 / 1024 * 100) / 100;
                usedUnit = "TB";
            } else if (usage >= 1024 * 1024 * 1024) {
                // GB
                usedValue = Math.round(usage / 1024 / 1024 / 1024 * 100) / 100;
                usedUnit = "GB";
            } else {
                // MB
                usedValue = Math.round(usage / 1024 / 1024 * 100) / 100;
                usedUnit = "MB";
            }

            let totalValue, totalUnit;
            if (quota >= 1024 * 1024 * 1024 * 1024) {
                // TB
                totalValue = Math.round(quota / 1024 / 1024 / 1024 / 1024 * 100) / 100;
                totalUnit = "TB";
            } else if (quota >= 1024 * 1024 * 1024) {
                // GB
                totalValue = Math.round(quota / 1024 / 1024 / 1024 * 100) / 100;
                totalUnit = "GB";
            } else {
                // MB
                totalValue = Math.round(quota / 1024 / 1024 * 100) / 100;
                totalUnit = "MB";
            }

            showMemoryUsed.textContent = `${usedValue} ${usedUnit}`;
            showMemoryTotal.textContent = `${totalValue} ${totalUnit}`;
        });
    }

    updateStorage();

    if (lastWallpaper != undefined) {
        lastWallpaper.classList.add('last');
    }

    BdApi.saveData("VideoBackground", "videoBackgroundUserInputName", false);

    fileNameInput.addEventListener('input', () => {
        if (fileNameInput.value.trim() == '') {
            BdApi.saveData("VideoBackground", "videoBackgroundUserInputName", false);
            showUploadVideoName.textContent = fileNameInput.value.trim();
            return;
        }
        if (file !== undefined) {
            showUploadVideoName.textContent = fileNameInput.value.trim();
        }
        BdApi.saveData("VideoBackground", "videoBackgroundUserInputName", true);
    })

    caches.keys().then(keys => {
        Promise.all(
            keys.filter(key => key !== videoCache).map(key => caches.delete(key))
        )
    })

    uploader.addEventListener('click', (event) => {
        if (!preventRapidClicks('uploader')) return;

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

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!preventRapidClicks('form-submit')) return;

        let freeSpace = await navigator.storage.estimate().then(({ usage, quota }) => {
            return quota - usage;
        })

        if (fileNameInput.value.trim() == '') {
            renderErrors(errors.nameInputEmpty);
            return console.error(errors.nameInputEmpty);
        } else if (file == undefined) {
            renderErrors(errors.fileInputEmpty);
            return console.error(errors.fileInputEmpty);
        } else if (/^[\/\\\*\?\"\<\>\|]/.test(fileNameInput.value) || /[\x00-\x1F\x7F-\x9F]/.test(fileNameInput.value)) {
            renderErrors(errors.invalidCharacters);
            return console.error(errors.invalidCharacters);
        } else if (freeSpace < (1024 * 1024 * 1024)) {
            renderErrors(errors.outOfMemory);
            return console.error(errors.outOfMemory);
        }

        submitErrorContainer.textContent = '';
        saveInCache(file);
    })

    function modifyName(newName) {
        const hasUserInput = BdApi.loadData("VideoBackground", "videoBackgroundUserInputName") === true;
        const isInputEmpty = fileNameInput.value.trim() === '';

        if (isInputEmpty || !hasUserInput) {
            fileNameInput.value = newName;
            showUploadVideoName.textContent = newName;
        } else {
            showUploadVideoName.textContent = fileNameInput.value.trim();
        }
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

        const sanitizedName = cacheKey.replace(/[^\x00-\xFF]/g, '_');

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

        marginLeft = 0;
        showWallpapersContainer.style.marginLeft = `${marginLeft}px`;
        lastWallpaperVisible = false;

        const selectedWallpaperName = BdApi.loadData("VideoBackground", "selectedWallpaper");

        updateStorage();

        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.open(cacheName).then(async cache => {
                    const keys = await cache.keys();
                    const sortedKeys = [...keys];

                    if (selectedWallpaperName) {
                        console.log(`selectedWallpaperName ${selectedWallpaperName}`)
                        sortedKeys.sort((a, b) => {
                            const nameA = decodeURIComponent(new URL(a.url).pathname.split('/').pop());
                            const nameB = decodeURIComponent(new URL(b.url).pathname.split('/').pop());
                            console.log(`a ${a}`)
                            console.log(`b ${b}`)
                            console.log(`name A ${nameA}`)
                            console.log(`name B ${nameA}`)
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
                                injectVideo(videoURL);
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
        BdApi.saveData("VideoBackground", "videoBackgroundUserInputName", false);
    }

    arrowLeftBtn.addEventListener('click', () => {
        if (!preventRapidClicks('arrow-left')) return;
        moveWallpapers('left');
    })

    arrowRightBtn.addEventListener('click', () => {
        if (!preventRapidClicks('arrow-right')) return;
        moveWallpapers('right');
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
            if (showWallpapers.offsetWidth > showWallpapersContainer.offsetWidth) {
                arrowRightBtn.classList.add('disabled');
                await new Promise(resolve => setTimeout(resolve, 250))
            } else if (showWallpapers.offsetWidth < showWallpapersContainer.offsetWidth && val) {
                arrowRightBtn.classList.add('disabled');
                await new Promise(resolve => setTimeout(resolve, 250))
            }
        }
    }

    class Wallpaper {
        constructor(videoURL, videoName, elementClass) {
            if (videoURL == undefined) {
                console.error('The video URL is undefined');
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

        deleteButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                if (!preventRapidClicks('delete-button-' + index)) return;

                const wallpaper = button.closest('.wallpaper');
                let name = wallpaper.getAttribute('value');
                deleteVideo(name);
            });
        });

        editButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                if (!preventRapidClicks('edit-button-' + index)) return;

                const wallpaper = button.closest('.wallpaper');
                let name = wallpaper.getAttribute('value');
                let editInput = wallpaper.querySelector('.editInput');
                editVideoName(name, editInput);
            })
        })

        editNameInputs.forEach((input, index) => {
            const div = input.closest('.name');
            div.addEventListener('dblclick', () => {
                if (!preventRapidClicks('edit-name-' + index)) return;

                let wallpaper = input.closest('.wallpaper');

                if (!wallpaper) {
                    console.error('Could not find parent wallpaper element');
                    return;
                }

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
                if (!preventRapidClicks('wallpaper-' + index)) return;

                const buttons = event.target.closest('.buttons');
                const input = event.target.closest('.editInput');
                const nameDiv = event.target.closest('.name');

                if (buttons || input) {
                    return;
                }

                selectWallpaper(wallpaper, nameDiv);
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

                    if (name === BdApi.loadData("VideoBackground", "selectedWallpaper")) {
                        BdApi.saveData("VideoBackground", "selectedWallpaper", null);
                        removeVideoElement();
                    }

                    marginLeft = 0;
                    showWallpapersContainer.style.marginLeft = `${marginLeft}px`;
                    lastWallpaperVisible = false;

                    renderVideos();
                    updateVariables();
                    disableArrowBtns('left');
                    disableArrowBtns('right');
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
        console.log(`oldName: ${oldName}`);
        let input = inputElement;
        let inputLength = input.value.length;

        input.disabled = false;
        input.focus();
        input.setSelectionRange(inputLength, inputLength);


        const inputHandler = () => {
            console.log('inputed');
        };

        const finishEditing = async () => {
            let newName = input.value.trim();
            if (newName === oldName || newName === '') {
                input.value = oldName;
            } else {
                const sanitizedName = newName.replace(/[^\x00-\xFF]/g, '_');

                const cache = await caches.open(videoCache);
                const keys = await cache.keys();
                const nameExists = keys.some(key => {
                    const cachedFileName = decodeURIComponent(new URL(key.url).pathname.split('/').pop());
                    return cachedFileName === newName && cachedFileName !== oldName;
                });

                if (nameExists) {
                    alert('A video with this name already exists');
                    input.value = oldName;
                } else {
                    input.value = newName;
                    console.log(`Name before update func: ${newName}`)
                    await updateVideoName(oldName, newName, sanitizedName);
                }
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

    async function updateVideoName(oldName, newName, sanitizedName) {
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
                            'File-name': sanitizedName
                        }
                    });

                    if (oldName === BdApi.loadData("VideoBackground", "selectedWallpaper")) {
                        BdApi.saveData("VideoBackground", "selectedWallpaper", newName);
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

    async function selectWallpaper(wallpaper, nameDiv) {
        let name = wallpaper.getAttribute('value');
        if (name === BdApi.loadData("VideoBackground", "selectedWallpaper")) {
            if (nameDiv) {
                return;
            }
            BdApi.saveData("VideoBackground", "selectedWallpaper", 'disabled');
            removeVideoElement();
            renderVideos();
            return;
        }
        BdApi.saveData("VideoBackground", "selectedWallpaper", name);
        console.log(showWallpapersContainer.innerHTML);
        renderVideos();
    }

    function injectVideo(url) {
        const container = document.getElementById("fullscreen-bg") || createVideoContainer();
        const videoElement = container.querySelector('video');

        if (!videoElement) {
            container.innerHTML = `
                <video id="fullscreen-bg-video" autoplay muted loop>
                    <source src="${url}" type="video/mp4">
                </video>
            `;
        } else {
            const source = videoElement.querySelector('source');
            source.src = url;
            videoElement.load();
            videoElement.play().catch(error => console.log("Autoplay prevented:", error));
        }
    }

    function createVideoContainer() {
        const container = document.createElement("div");
        container.id = "fullscreen-bg";
        container.className = "fullscreen-bg";
        document.getElementById("app-mount").appendChild(container);
        return container;
    }

    function removeVideoElement() {
        const container = document.getElementById("fullscreen-bg");
        if (container) {
            container.innerHTML = '';
        }
    }

    async function updateVariables() {
        wallpapers = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper');
        lastWallpaper = showWallpapersContainer.lastElementChild;
        allVideos = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.video video');
        deleteButtons = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.bottom div.buttons button.delete-button');
        editButtons = document.querySelectorAll('div#videoBackgroundSettings div.showWallpapers div.container div.wallpaper div.bottom div.buttons button.editBtn');
        editNameInputs = document.querySelectorAll('div#videoBackgroundSettings div.settings-section.apply div.showWallpapers div.wallpapersContainer div.container div.wallpaper div.name input');

        let keys = await caches.keys();

        if (keys.length == 1 && !BdApi.loadData("VideoBackground", "selectedWallpaper")) {
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

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            open = false;
            toggleSettings(open);
        }
    });


    let lastGlobalClickTime = 0;
    const globalClickInterval = 250;

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'w') {
            const now = Date.now();
            if (now - lastGlobalClickTime < globalClickInterval) return;
            lastGlobalClickTime = now;

            if (open) {
                open = false;
                toggleSettings(open);
                return;
            }
            open = true;
            toggleSettings(open);
        }
    });

    document.querySelector('#app-mount').addEventListener('click', (event) => {
        if (open) {
            let div = event.target.closest('#videoBackgroundSettings');
            console.log(div)
            if (div) {
                return;
            }
            open = false;
            toggleSettings(open);
        }
    });

    function toggleSettings(show) {
        if (!show) {
            open = false;
            videoBackgroundSettings.style.display = 'none';
        } else {
            open = true;
            videoBackgroundSettings.style.display = 'flex';
            updateVariables();
            renderVideos();
            return;
        }
    }

    toggleSettings(open);

    console.warn('VideoBackground loaded');
}