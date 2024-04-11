// JS
// Template Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

chrome.runtime.onInstalled.addListener((e)=>{
    if (e.reason == "install") {
        
    }
})

chrome.runtime.onMessage.addListener((m)=>{
    if (m.type == "windowDraw") {
        chrome.windows.create({type:"popup", width:50, height:50, left:m.x-50, top:m.y+100})
    }
})