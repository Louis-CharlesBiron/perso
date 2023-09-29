// JS
// Note Pad Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

//GOLBAL DECLARATIONS
function format_title(t) {return 'ADD "%s" TO "'+t+'"'}

function sendMessage(type, content) {
    chrome.runtime.sendMessage({content: content, type: type})  
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type == "update_ctx") {
        let f = message.content
        if (f) chrome.contextMenus.update("addToNote", {visible:true, title:format_title(f.t)})
        else chrome.contextMenus.update("addToNote", {visible:false})
    }
})

function ctx_save_file(rf, e, o) {
    if (rf) {
        let v = rf.c+o.cp+(e.selectionText||"")+o.cs
        rf.c = v
        rf.m = new Date().getTime()
        chrome.storage[rf.s].set({[rf.t]:rf})
    }
}

chrome.contextMenus.onClicked.addListener((e)=>{
    if (e.menuItemId == "addToNote") {
        chrome.storage.sync.get((r)=>{
            chrome.storage.local.get((lr)=>{
                let o = r.$o, files = [], qmf = r[o.qm]||lr[o.qm]

                if (o.qm == "$le" || !qmf) {
                    lr.$fs.forEach((f)=>{files.push(lr[f])})
                    r.$fs.forEach((f)=>{files.push(r[f])})
                    ctx_save_file(Array.from(files).sort((a, b) => b.m - a.m).filter(f => (f.p == null))[0], e, o)
                } else ctx_save_file(qmf, e, o)

            })
        })
    }
})

chrome.runtime.onInstalled.addListener((e)=>{
    if (e.reason == "install") {
        chrome.storage.sync.get((r)=>{
            if (!r["$o"]) {
                const default_settings = {
                    t:"l",
                    ao:1,
                    f:12,
                    n:"Unnamed",
                    e:"txt",
                    s:"local",
                    cp:"",
                    cs:"",
                    qm:"$le",
                    p:"",
                    d:0,
                    c:"prompt"
                }
                chrome.storage.sync.set({$o:default_settings,$fs:[]})                
            }
            if (!r.$fs) chrome.storage.local.set({$fs:["Unnamed1"],"Unnamed1":{"t": "Unnamed1","c": "Hello world !","s": "local","m": new Date().getTime(),"e": "txt","p": null,"f": 0}})
        })

        set_ctx_menu(true)
    } 
    else if (e.reason == "update") set_ctx_menu()
})

function set_ctx_menu(onInstalled) {
    chrome.contextMenus.removeAll()
    if (onInstalled) chrome.contextMenus.create({contexts:["selection"], enabled:true, id:"addToNote", title:format_title("Unnamed1"), visible:true, type:"normal"})
    else chrome.contextMenus.create({contexts:["selection"], enabled:true, id:"addToNote", title:"Open popup to refresh...", visible:false, type:"normal"})
}

