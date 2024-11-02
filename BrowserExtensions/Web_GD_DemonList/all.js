// ADD FAVICON
let favicon = document.createElement("link")
favicon.href = chrome.runtime.getURL("extreme.png")
favicon.rel = "shortcut icon"
document.querySelector("head").appendChild(favicon)