// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
const MSYEAR = 31536000000, MSDAY = 86400000

chrome.runtime.onInstalled.addListener((e)=>{
    chrome.alarms.create("daily", {delayInMinutes:1, periodInMinutes:1000})
    chrome.action.setBadgeTextColor({color:"#fff"})
    chrome.action.setBadgeBackgroundColor({color:"red"})
    checkbd()

    if (e.reason == "install") {
        chrome.storage.sync.get((r)=>{
            if (!r.$a) {
                chrome.storage.sync.set({
                    $a:1,
                    $bd:[],
                    $dm:0
                })
                console.log("Welcome!")
            }
            else {
                chrome.storage.sync.set({$a:r.$a+1})
                console.log(`Welcome back! (${r.$a+1})`)
            }
        })
    }
})

function checkbd() {
    chrome.storage.sync.get((r)=>{
        let bds = r.$bd.map(x=>r[x]).filter(x=>{
            let d = new Date(`${new Date().getFullYear()}-${new Date(x.d).getMonth()+1}-${new Date(x.d).getDate()} 00:00`).getTime(), c = new Date().getTime()
            return Math.sign(((c/MSDAY)>>0 <= (d/MSDAY)>>0) ? d-c : (d+MSYEAR)-c) < 1
        })
        if (bds.length) {
            chrome.action.setTitle({title:"People's birthday today!"})
            chrome.action.setBadgeText({text:''+bds.length})
        } else {
            chrome.action.setTitle({title:"Open Birtday Manager..."})
            chrome.action.setBadgeText({text:""})
        }
    })
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type == "checkbd") checkbd()
})

chrome.alarms.onAlarm.addListener((a)=>{
    if (a.name == "daily") checkbd()
})