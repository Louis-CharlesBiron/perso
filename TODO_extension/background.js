// Todo Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

chrome.runtime.onInstalled.addListener((e)=>{
    if (e.reason == "install" || e.reason == "update")
        chrome.storage.sync.get((r)=>{
            if (!r.$l) 
                chrome.storage.sync.set({
                    $d: { // DEFAULT SETTINGS

                    },
                    $l: [], // TODOs list
                    $a:0 
                })
            else chrome.storage.sync.set({$a:(r.$a||0)+1})
        })
})