// JS
// Time Since Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

function set_storage(type, name, value) {chrome.storage[type].set({[name]:value})}

chrome.runtime.onInstalled.addListener((e)=>{
    if (e.reason == "install") {
        console.log("Extension Successfully installed !")
        chrome.storage.sync.get((r)=>{
            if (typeof r.e_list == "undefined") {
                set_storage("sync", "e_list", [{n:"Extension Installed", m:"Thank you !",  t:new Date().getTime(), c:"#77899b"}])
                set_storage("sync", "dt", "days")
                set_storage("sync", "dtp", 0)
                set_storage("sync", "rcc", true)
            }
        })
    }
})









