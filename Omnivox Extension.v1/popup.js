// JS
// Omnivox Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
// On content loaded →
document.addEventListener("DOMContentLoaded", function() {

//Display version
chrome.management.getSelf().then((e)=>{document.getElementById("version").textContent = "V"+e.versionName})
//

function get_time() {
    function pad0(num) {return (num > 9) ? num : "0"+num}
    let d = new Date()
    return  pad0(d.getHours())+":"+pad0(d.getMinutes())+":"+pad0(d.getSeconds())
}

let dmcheck = document.getElementById("dmcheck"), lgcheck = document.getElementById("lgcheck"), user = document.getElementById("user"), pw = document.getElementById("pw"), savelg = document.getElementById("savelg"), time = document.getElementById("time")

time.textContent = get_time()
setInterval(()=>{
    time.textContent = get_time()
},450)

function keep_checkbox(el, storageType, storageName, callbackOn, callbackOff, init_checked, cb_onclick) {//*arg filled
    let isCbOn = (typeof callbackOn == "function"), isCbOff = (typeof callbackOff == "function")
    chrome.storage[storageType].get((result)=>{
        let rchecked = result[storageName]
        if (rchecked == false) {
            el.checked = false
            if (isCbOff && !cb_onclick) callbackOff()
        }
        else if (rchecked == true) {
            el.checked = true
            if (isCbOn && !cb_onclick) callbackOn()
        }
        else {
            chrome.storage[storageType].set({[storageName]: Boolean(init_checked)})
            el.checked = init_checked
        }
    })
    el.addEventListener("click",()=>{
        let cc = el.checked
        if (cc && isCbOn) callbackOn()
        else if (!cc && isCbOff) callbackOff()
        chrome.storage[storageType].set({[storageName]: cc}).catch(err=>{})
    })
    return el
}

function sendMessage(type, toContent) {
    if (typeof toContent == "undefined") {
        chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: type}).catch(()=>{})
            chrome.runtime.sendMessage({type: type}).catch(()=>{})
    })}

    if (toContent) {
    chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: type}).catch(()=>{})
    })} else {
        chrome.runtime.sendMessage({type: type}).catch(()=>{})
}}

keep_checkbox(dmcheck, "sync", "dm", ()=>{sendMessage("dm")}, ()=>{sendMessage("dmoff")}, false, false)

keep_checkbox(lgcheck, "sync", "lg", ()=>{sendMessage("log", true)}, null, false, true)

// bloc note
let notes = document.getElementById("blocNote"), n_to
notes.oninput=()=>{
    clearTimeout(n_to)
    n_to = setTimeout(()=>{
        chrome.storage.sync.set({c:notes.value}).catch()
    },500)
}

// on popup open
chrome.storage.sync.get((r)=>{
    user.value = r.u||""
    pw.value = r.p||""
    notes.value = r.c||""
})

// auto login
savelg.onclick=()=>{
    chrome.storage.sync.set({u:user.value, p:pw.value})
}

pw.oncontextmenu=(e)=>{
    e.preventDefault()
    if (pw.type == "text") pw.type = "password"
    else pw.type = "text"
}

document.getElementById("hl").onclick=()=>{
    chrome.tabs.create({url:"https://climoilou.omnivox.ca"})
}




});
    