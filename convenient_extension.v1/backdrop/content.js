// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use nor credit this code as your own.
//

function set_storage(type, name, value) {chrome.storage[type].set({[name]:value})}

let html = document.querySelector("html"), head = document.querySelector("head")
html.style.transition = "filter 0.2s"

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type == "showPass") {showPass()}
    if (message.type == "invert") {invert()}
    if (message.type == "bright") {bright(message.content)}
    if (message.type == "resetB") {resetB()}
})

function resetB() {
    chrome.storage.local.set({pl_v:""})
    html.style.filter = ""
    if (document.querySelector("#sclassStylessclass")) {document.querySelector("#sclassStylessclass").remove()}
    toggle_invert = true
}

let toggle_sp = false
function showPass() {
    if (!toggle_sp) {
        toggle_sp = true
        document.querySelectorAll("input[type='password']").forEach((el)=>{
            el.type = "text"
            el.setAttribute("UuisPasswordElementuU", true)
            })
    } 
    else {
        toggle_sp = false
        document.querySelectorAll("input[UuisPasswordElementuU=true]").forEach((el)=>{el.type = "password"})
    }
}

function match(string, ...matchers) {
    let res_list=[]
    matchers.forEach((matcher)=>{
        res_list = res_list.concat(string.match(matcher)||[])
    })
    return res_list
}

let toggle_invert = true, pl_cd0, pl_cd1
function invert() {
    let sclass = document.createElement("style"), v = html.style.filter
    if (toggle_invert) {html.style.filter = (v.includes("invert(1)") && v.includes("hue-rotate(180deg)")) ? v : "invert(1) hue-rotate(180deg) "+v}
    else {html.style.filter = html.style.filter.replace(/(invert)\(([\d.])+\)/gi, "").replace(/(hue-rotate)\(([\d.deg])+\)/gi, "").trim()}
    
    sclass.appendChild(document.createTextNode(`
    img, video, [style*='background-image: url']:not(body), [style*='background: url']:not(body) {transition: all 0.2s; filter: invert(1) hue-rotate(180deg);}
    html:not([style*='background']) {background-color:white;}
    `))
    sclass.id = "sclassStylessclass"
    if (toggle_invert) {head.appendChild(sclass)}
    else if (document.querySelector("#sclassStylessclass")) {document.querySelector("#sclassStylessclass").remove()}
    toggle_invert = !toggle_invert

    clearTimeout(pl_cd0)
    pl_cd0 = setTimeout(()=>{set_storage("local","pl_v", html.style.filter)},300)
}

function bright(v) {
    let bv = match(match(html.style.filter, /(brightness)\(([\d.])+\)/gi).join(), /\d+/g).join(".")
    if (bv !== "") {
        bv = Number((Number(bv) + v).toFixed(2))
        html.style.filter = html.style.filter.replace(/(brightness)\(([\d.])+\)/gi, "brightness("+bv+")")
    } else {
        html.style.filter += " brightness("+(1+v)+")"
    }

    clearTimeout(pl_cd1)
    pl_cd1 = setTimeout(()=>{set_storage("local","pl_v", html.style.filter)},300)
}

chrome.storage.sync.get((result)=>{
    if (result.plc) {
        chrome.storage.local.get((r)=>{
            if (r.pl_v) {
                html.style.filter = r.pl_v
                if (r.pl_v.includes("invert(1)") && r.pl_v.includes("hue-rotate(180deg)")) {invert();toggle_invert=false}
            }
        })
    }
})


function test() {
    let a = document.createElement("canvas")
    .style = `
       display: flex;
       position: fixed;
       background-color: transparent;
       top: 0;
       left: 0;
       z-index: 1000000;
       width: 100%;`
    document.querySelector("body").appendChild(a)
}