// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

chrome.runtime.onInstalled.addListener((e)=>{
    if (e.reason == "install") {
        chrome.storage.sync.get((r)=>{
            if (!r.a) {
                chrome.storage.sync.set({
                    $a:1,
                    $bd:[]
                })
                console.log("Welcome!")
            }
            else {
                chrome.storage.sync.set({a:r.a+1})
                console.log(`Welcome back! (${r.a+1})`)
            }
        })
    }
})