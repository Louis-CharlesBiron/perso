// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

function sendMessage(content, type, toContent) {// str, str, boolean
    if (toContent == true) {
    chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
        if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {content: content, type: type}).catch(err=>{console.log(err)})
    }})} else {
        chrome.runtime.sendMessage({content: content, type: type})
}}

function set_storage(type, name, value) {chrome.storage[type].set({[name]:value})}

chrome.runtime.onInstalled.addListener((e)=>{
    if (e.reason == "install") {
        console.log("Extension Successfully installed !")
    } else if (e.reason == "update") updateActionTitle()
})

function updateActionTitle() {
    chrome.commands.getAll((cmds)=>{
        chrome.action.setTitle({title:"Menu ("+(cmds[0].shortcut||"No Shortcut")+")"})
    })
}

chrome.contextMenus.removeAll()
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"duplicateTab", title:"Dupliquer l'onglet", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"pinTab", title:"Épingler l'onglet", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"afk", title:"Ouvre page d'inactivité", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"detach", title:"Détache la page active", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"savew", title:"Sauvegarde les pages actives", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"loadw", title:"Charge les pages sauvegardées", visible:true, type:"normal"})
chrome.contextMenus.create({id:"sep1", visible:true, type:"separator"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"invert", title:"Inverser luminosité", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"resetB", title:"Réinitialiser luminosité", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"showPass", title:"Montrer mots de passe", visible:true, type:"normal"})
chrome.contextMenus.create({id:"sep2", visible:true, type:"separator"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"url1", title:"Raccourci #1", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"url2", title:"Raccourci #2", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"url3", title:"Raccourci #3", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"url4", title:"Raccourci #4", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"url5", title:"Raccourci #5", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"url6", title:"Raccourci #6", visible:true, type:"normal"})
chrome.contextMenus.create({id:"sep3", visible:true, type:"separator"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"clip1", title:"Valeur presse-papiers #1", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"clip2", title:"Valeur presse-papiers #2", visible:true, type:"normal"})
chrome.contextMenus.create({contexts:["all"], enabled:true, id:"clip3", title:"Valeur presse-papiers #3", visible:true, type:"normal"})

chrome.contextMenus.onClicked.addListener((e)=>{
    if (e.menuItemId.includes("url")) openSC(e.menuItemId)
    else if (e.menuItemId == "duplicateTab") dupeTab()
    else if (e.menuItemId == "pinTab") pinTab()
    else if (e.menuItemId == "detach") detach()
    else if (e.menuItemId == "invert") sendMessage("", "invert", 1)
    else if (e.menuItemId == "showPass") sendMessage("", "showPass", 1)
    else if (e.menuItemId == "afk") openAFK()
    else if (e.menuItemId == "resetB") sendMessage("", "resetB", 1)
    else if (e.menuItemId == "savew") saveWindows()
    else if (e.menuItemId == "loadw") loadWindows()
    else if (e.menuItemId.includes("clip")) cb_paste(e.menuItemId)
    updateActionTitle()
})

//commands
chrome.commands.onCommand.addListener((command)=>{
    if (command == "duplicate_tab") dupeTab()
    else if (command.includes("url")) openSC(command)
    else if (command == "detach") detach()
    else if (command == "pin_tab") pinTab()
    else if (command == "toggle_passwords") sendMessage("", "showPass", 1)
    else if (command == "invert") sendMessage("", "invert", 1)
    else if (command == "afk") openAFK()
    else if (command == "upB") sendMessage(0.05, "bright", 1)
    else if (command == "downB") sendMessage(-0.05, "bright", 1)
    else if (command == "resetB") sendMessage("", "resetB", 1)
    else if (command == "savew") saveWindows()
    else if (command == "loadw") loadWindows()
    else if (command.includes("clip")) cb_paste(command)
    updateActionTitle()
})

function cb_paste(command) {
    chrome.storage.sync.get((r)=>{
        let v = r[command.replace("clip","cbv")] || ""
        sendMessage(v, "cclipboard", 1)
    })
}

function dupeTab() {
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.duplicate(tabs[0].id)
    })
}

function pinTab() {
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        let tab = tabs[0]
        chrome.tabs.update(tab.id, {pinned: !tab.pinned})
    })
}

function openSC(sn) {
    chrome.storage.sync.get((r)=>{
        let url = r[sn.replace("url","sc")]
        if (url && url !== "") {
            if (r.t == "_blank") {
                chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
                    if (tabs[0].url.includes("//new-tab") || tabs[0].url.includes("//newtab")) {chrome.tabs.update({url:url})}
                    else {chrome.tabs.create({url:url})}
                })
            }
            else if (r.t == "_nw") {chrome.windows.create({focused:true, state:"maximized", type:"normal", url:url})}
            else {chrome.tabs.update({url:url})}
        }
    })
}

function openAFK() {
    let afk_url = chrome.runtime.getURL("backdrop/afk.html")
    chrome.tabs.query({url:afk_url},(tabs)=>{
        let t_ll  = tabs.length
        if (t_ll == 0) {chrome.tabs.create({active:true, url:afk_url})}
        else {
            if (tabs[0].active == true) {for (let i=0;i<t_ll;i++) {chrome.tabs.remove(tabs[i].id)}}
            else {
            chrome.tabs.update(tabs[0].id, {active:true})
            for (let i=1;i<t_ll;i++) {chrome.tabs.remove(tabs[i].id)}
            }
        }    
    })
}


chrome.tabs.onRemoved.addListener(keepAwake_manager)
chrome.tabs.onUpdated.addListener(keepAwake_manager)
let KAmcd
function keepAwake_manager() {
    clearTimeout(KAmcd)
        KAmcd = setTimeout(()=>{
        chrome.tabs.query({url:chrome.runtime.getURL("backdrop/afk.html")},(tabs)=>{
            if (tabs.length > 0) {chrome.power.requestKeepAwake("display")}
            else {chrome.power.releaseKeepAwake()}
        })
    },500) 
}

function detach() {
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        let tab = tabs[0]
        if (tab) {
            chrome.windows.create({focused:true, state:"maximized"}, (w)=>{
                chrome.tabs.move(tab.id, {windowId:w.id, index:0})
                chrome.tabs.remove(w.tabs[0].id)
            })
        }
    })
}


function saveWindows() {
    let openedWindows = []
    chrome.windows.getAll((ws)=>{
        ws.forEach((w, i)=>{
            openedWindows.push({focused:w.focused, height:w.height, width:w.width, left:w.left, top:w.top, state:w.state, type:w.type, tabs:[]})
            chrome.tabs.query({windowId:w.id},(tabs)=>{
                tabs.forEach((t)=>{openedWindows[i].tabs.push({active:t.active,index:t.index,pinned:t.pinned,url:t.url})})             
            })
        })
        setTimeout(()=>{
            chrome.storage.sync.set({sw:{ws: openedWindows, d:new Date().getTime()}})
        },200)
    })
}

function loadWindows() {
    chrome.storage.sync.get((r)=>{
        if (r.sw && r.sw.ws.length > 0) {
            r.sw.ws.forEach((w)=>{
                let createTabs=(cw)=>{
                    w.tabs.forEach((t)=>{
                        chrome.tabs.create({active:t.active,index:t.index,pinned:t.pinned,url:t.url,windowId:cw.id})
                    })
                }
                if (["maximized", "minimized", "fullscreen"].includes(w.state)) chrome.windows.create({focused:w.focused, state:w.state, type:w.type}, createTabs)
                else chrome.windows.create({focused:w.focused, height:w.height, width:w.width, left:w.left, top:w.top, state:w.state, type:w.type}, createTabs)
            })
        }
    })
}