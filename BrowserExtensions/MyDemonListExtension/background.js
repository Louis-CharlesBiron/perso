// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.

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