let loaded = false;
let tabs = [];
chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(t=>tabs=t);
const openCanvas = () => {
    addCanvas();
}
const addCanvas = async () => {
    await chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        files: ["src/annotex-events.js"]
    })
}
document.querySelector("button").onclick = addCanvas;
console.log(tabs);
// window.onload = injectBaseFiles();