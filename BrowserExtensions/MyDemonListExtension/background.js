// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.

const iframeHosts = ["www.youtube.com"]
chrome.runtime.onInstalled.addListener(e=>{

    if (e.reason == "install" || e.reason == "update") chrome.storage.sync.get((r)=>{
        if (!r.$l) chrome.storage.sync.set({
                $u: "???",
                $l: [],
                $d: "local",
                $a:0
            })
        else chrome.storage.sync.set({$a:r.$a+1})
    })

    // fix iframes :|
    const RULE = {
        id: 1,
        condition: {initiatorDomains:[chrome.runtime.id], requestDomains:iframeHosts, resourceTypes:["sub_frame"]},
        action: {type:"modifyHeaders",requestHeaders:[{header:"referer", value:chrome.runtime.id, operation:"set"}]},
    }
    chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:[RULE.id],addRules:[RULE]})
})


function reInstall() {
    chrome.storage.sync.set({
        $u: "???",
        $l: [],
        $d: "local",
        $a:0
    })
}

function syncAll() {
    chrome.storage.local.get(local=>{
        let allSynced = Object.entries(local).reduce((a,b)=>{
            let l = b[1]
            l.s = "sync"
            a[b[0]]=l
            return a
        },{})
        chrome.storage.sync.set(allSynced)
        chrome.storage.local.clear()
    })
}