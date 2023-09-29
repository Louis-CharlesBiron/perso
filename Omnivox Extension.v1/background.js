// JS
// Omnivox Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

function sendMessage(type) {// str, str, boolean
    chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: type}).catch(err=>{})
    })
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type == "dm") dmon()
    if (message.type == "dmoff") dmoff()
})

chrome.commands.onCommand.addListener((command)=>{
    chrome.storage.sync.get((r)=>{
        if (command == "dm" && r.dm) {
            sendMessage("dmoff")
            dmoff()
        }
        else if (command == "dm" && !r.dm) {
            sendMessage("dm")
            dmon()
        }
    })
})

function dmon() {
    chrome.storage.sync.set({dm:true})
    // Register
    chrome.scripting.registerContentScripts([{
        id: "dm",
        css: ["backdrop/injected.css"],
        persistAcrossSessions: true,
        matches: ["https://climoilou.omnivox.ca/*", "https://climoilou-lea.omnivox.ca/*", "https://climoilou-estd.omnivox.ca/*"],
        excludeMatches: ["https://climoilou-lea.omnivox.ca/cvir/ddle/VisualiseDocument.aspx*"]
      }
    ]).catch(()=>{})
}

function dmoff() {
    chrome.storage.sync.set({dm:false})
    chrome.scripting.unregisterContentScripts({ids:["dm"]}).catch(()=>{})
}

chrome.runtime.onInstalled.addListener((e)=>{
    if (e.reason == "install" || e.reason == "update") {
        chrome.storage.sync.get((r)=>{
            if (r.dm==true) dmon()
        })
    }
})