// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

// On content loaded →
document.addEventListener("DOMContentLoaded", function() {
//Display version
let v_el = document.querySelector(".version")
chrome.management.getSelf().then((e)=>{v_el.textContent = "V"+e.version})

function set_storage(type, name, value) {chrome.storage[type].set({[name]:value})}

let month_bank = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
function getDate(date) {// jj m y
    let d = date ? new Date(date) : new Date()  
    return d.getDate()+" "+month_bank[d.getMonth()]+" "+d.getFullYear()+", "+["getHours","getMinutes","getSeconds"].reduce((a, b)=>{return a+":"+(d[b]()>9?d[b]():"0"+d[b]())},"").slice(1)
}

function keep_checkbox(el, storageType, storageName, callbackOn, callbackOff, init_checked, cb_onclick) {//*arg filled
    let isCbOn = (typeof callbackOn == "function"), isCbOff = (typeof callbackOff == "function")
    chrome.storage[storageType].get((result)=>{
        let rchecked = result[storageName]
        if (rchecked == false) {
            el.checked = false
            if (isCbOff && !cb_onclick) {callbackOff()}
        }
        else if (rchecked == true) {
            el.checked = true
            if (isCbOn && !cb_onclick) {callbackOn()}
        }
        else {
            chrome.storage[storageType].set({[storageName]: Boolean(init_checked)})
            el.checked = init_checked
        }
    })
    el.addEventListener("click",()=>{
        let cc = el.checked
        if (cc && isCbOn) {callbackOn()}
        else if (!cc && isCbOff) {callbackOff()}
        chrome.storage[storageType].set({[storageName]: cc})
    })
    return el
}

function get_time(dh, dm, ds) {// 00:00:00
    function pad0(num) {return (num > 9) ? num : "0"+num}
    if (!dh && !dm && !ds) {dh = dm = ds = ":"}
    let d = new Date(),
        h = (dh == ":") ? pad0(d.getHours()) : "",
        m = (dm == ":") ? pad0(d.getMinutes()) : "",
        s = (ds == ":") ? pad0(d.getSeconds()) : "",
        r = (dh) ? h+dm+m+ds+s : (h+dm+m+ds+s).replace(":","")
        return (!isNaN(Number(r))) ? Number(r) : r
}

function noTOinterval(ms, callback) {
    callback()
    return setInterval(callback, ms)
}
noTOinterval(500, ()=>{document.querySelector(".time").textContent = get_time(":",":",":")})

// Toggleable sections
document.querySelectorAll(".section_checkbox").forEach((el)=>{
    let content = el.parentElement.nextElementSibling
    keep_checkbox(el, "sync", el.id, ()=>{content.style.display = "none"}, ()=>{content.style.display = ""}, 0, 0)
})

//Note pad
let notePad = document.querySelector("#blocNote"), notePad_cd
notePad.oninput=()=>{
    let v = notePad.value
        clearTimeout(notePad_cd)
        notePad_cd = setTimeout(()=>{
            set_storage("sync", "bn", v)
        },500)
}
chrome.storage.sync.onChanged.addListener((e)=>{
    if (e.bn) {
        document.querySelector("#blocNote").value = e.bn.newValue
    }
})

// *link related
let linkInputs = document.querySelectorAll(".scInput"), li_cd
chrome.storage.sync.get((r)=>{
    linkInputs.forEach((el)=>{

        el.onclick=(e)=>{
            if (e.ctrlKey) {chrome.tabs.create({url:el.value})}
        }

        el.oninput=()=>{
            clearTimeout(li_cd)
            li_cd = setTimeout(()=>{
                set_storage("sync", el.id, el.value)
            },500)
        }
        el.value = r[el.id] || ""
    })
})

chrome.commands.getAll((commands)=>{
    commands.forEach((c)=>{
        let el = document.querySelector("#"+c.name)
        if (el) {
            el.textContent = c.shortcut || "-"
            el.title = c.description
        }
    })
})

// Go extension shortcut page
document.querySelectorAll("#goCShortCuts, .sc_header").forEach((el)=>{
    el.onclick=()=>{
    chrome.tabs.create({url:"chrome://extensions/shortcuts"})
    }
}) 

// Options
let sel_t = document.querySelector("#sc_target"), sel_lang = document.querySelector("#lang"), hue_slider = document.querySelector("#hue"), hue_cd, hue_deg = document.querySelector("#hue_deg")
sel_t.oninput=()=>{
    set_storage("sync", "t", sel_t.value)
}
sel_lang.oninput=()=>{
    set_storage("sync", "lang", sel_lang.value)
    if (sel_lang.value == "en") {location.href = chrome.runtime.getURL("backdrop/popupEN.html")}
    else {location.href = chrome.runtime.getURL("popup.html")}
    
}
hue_slider.oninput=()=>{
    let v = hue_slider.value
    change_hue(v)
    clearTimeout(hue_cd)
    hue_cd = setTimeout(()=>{change_hue(v, 1)},400)
}
hue_slider.oncontextmenu=(e)=>{
    if (!e.ctrlKey && !e.altKey) {
        e.preventDefault()
        change_hue(0)
        clearTimeout(hue_cd)
        hue_cd = setTimeout(()=>{change_hue(0, 1)},400)
    }
}
function change_hue(hue, storage) {
    if (storage) {set_storage("sync", "hue", hue)}
        hue_slider.value = hue
        hue_deg.textContent = hue+" deg"
        document.querySelector("body").style.filter = "hue-rotate("+hue+"deg)"
}   

chrome.storage.sync.get((r)=>{
    sel_t.value = r.t || "_self"
    sel_lang.value = r.lang || "fr"
    change_hue(r.hue || 0)
    
    notePad.value = r.bn || ""
    
    if (r.sw) savew.parentElement.title = loadw.parentElement.title = "Saved("+getDate(r.sw.d)+"): "+r.sw.ws.map(x=>"Window("+x.tabs.length+" tabs)").join(", ")

})

let dm_c = keep_checkbox(document.querySelector("#darkMode"), "sync", "dm", ()=>{
    let link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = (document.documentElement.lang == "fr") ? "backdrop/popupDM.css" : "popupDM.css"
    link.id = "DM_stylesheet"
    document.querySelector("head").appendChild(link)
}, ()=>{
    document.querySelector("#DM_stylesheet")&&document.querySelector("#DM_stylesheet").remove()
}, 0, 0)

dm_c.onclick=()=>{
    document.documentElement.style.transition = "0.2s filter"
}

keep_checkbox(document.querySelector("#lumPers"), "sync", "plc", ()=>{set_storage("sync", "pl", true)}, ()=>{set_storage("sync", "pl", false);chrome.storage.local.remove("pl_v")}, 1, 1)






}); // Out of onDOM.. ↓

chrome.storage.sync.get((r)=>{
    if (r.lang == "en" && location.href !== chrome.runtime.getURL("backdrop/popupEN.html")) {
        location.href = chrome.runtime.getURL("backdrop/popupEN.html")
    }
})