// JS
// GD DL Extension by LCB
//
console.clear()
//console.log("GD Great ! DM 53%")
const Marathon_Progress = 100
console.log("DM 53%")
console.log("Marathon "+Marathon_Progress+"% | 60-100")

var sections = document.querySelectorAll("section")
for (let i = 0;i<sections.length;i++) {let section = sections[i]
if (section.style.overflow == "" && section.className == "panel fade") {
section.hidden = true
}}

setInterval(() => {
var oa = document.querySelectorAll(".adsbygoogle")
for (let i = 0;i<oa.length;i++) {
    oa[i].hidden = true
    oa[i].style.display = "none"
}
}, 1000);

setTimeout(()=>{
var favicon = document.createElement("link")
favicon.href = "https://static.wikia.nocookie.net/geometry-dash-unofficial/images/3/36/Extreme_Demon.png/revision/latest/scale-to-width-down/220?cb=20180214082927"
favicon.rel = "shortcut icon"
document.querySelector("head").appendChild(favicon)

document.querySelector("body > header > nav > div.nav-icon.nav-nohide > a").href = "https://www.pointercrate.com/demonlist/"
},1)

chrome.storage.sync.get((result)=>{
    if (typeof result.list === "undefined") {
var levels = document.querySelectorAll("section.panel[style*='overflow:hidden']")
let lll = levels.length
var level_list = [];
for (let i = 0;i<lll;i++) {let one = levels[i]
var level = {name:"",top:""}
if (one.firstElementChild.className !== 'flex col') {
level.name = one.firstElementChild.lastElementChild.firstElementChild.textContent.split(" – ")[1]
level.top = one.firstElementChild.lastElementChild.firstElementChild.textContent.split(" – ")[0]
}else if (one.firstElementChild.className == 'flex col') {
level.name = one.firstElementChild.firstElementChild.textContent.split(" – ")[1]
level.top = one.firstElementChild.firstElementChild.textContent.split(" – ")[0]
}
var level_info = level.name+" - "+level.top
level_list.push(level_info)
}
chrome.storage.sync.set({
    list : level_list
})} else {
var levels = document.querySelectorAll("section.panel[style*='overflow:hidden']")
var level_list = []
for (let i = 0;i<levels.length;i++) {let one = levels[i]
var level = {name:"",top:""}
if (one.firstElementChild.className !== 'flex col') {
level.name = one.firstElementChild.lastElementChild.firstElementChild.textContent.split(" – ")[1]
level.top = one.firstElementChild.lastElementChild.firstElementChild.textContent.split(" – ")[0]
}else if (one.firstElementChild.className == 'flex col') {
level.name = one.firstElementChild.firstElementChild.textContent.split(" – ")[1]
level.top = one.firstElementChild.firstElementChild.textContent.split(" – ")[0]
}
var level_info = level.name+" - "+level.top
level_list.push(level_info)
}}

var new_all = document.createElement("div")
var div = document.createElement("div")
div.className = "underlined"
var h2 = document.createElement("h2")
h2.style.color = "#379237f2"
h2.textContent = "New Levels:"
var DM = document.createElement("h2")
DM.style.fontSize = "14px"
DM.style.paddingTop = "14px"
DM.style.paddingBottom = "14px"
DM.style.border = "aliceblue 3px solid"
DM.style.borderRadius = "14px"
DM.style.color = "#f7d000"
DM.style.fontWeight = "500"
DM.style.backgroundColor = "#f0f8ff30"
var ot = document.createElement("p")
ot.id = "display_new"
ot.style.fontSize = "20px"
div.appendChild(h2)
new_all.appendChild(div)
new_all.appendChild(ot)
document.querySelector("#editors").insertBefore(new_all, document.querySelector("#editors").firstElementChild)
document.querySelector("#editors").insertBefore(DM, document.querySelector("#editors").children[1])

let legacys = document.querySelector("#legacy > ul").children
let legl = document.querySelector("#legacy > ul").childElementCount
for (let i = 0;i<legl;i++) {let legacy = legacys[i].title.toLowerCase()
    if (legacy.includes("duelo")) {DM.innerHTML += "<br><br>"+legacy+" : 100% !"}
    else if (legacy.includes("marathon")) {DM.innerHTML += "<br><br>"+legacy+" : "+Marathon_Progress+"% !"}
    else if (legacy.includes("cataclysm")) {DM.innerHTML += "<br><br>"+legacy+" : 100% !"}
    else if (legacy.includes("phobos")) {DM.innerHTML += legacy+" : 100% !"}
    else if (legacy.includes("ice carbon diablo x")) {DM.innerHTML += "<br><br>"+legacy+" : 100% !"}
    else if (legacy.includes("apollo 11")) {DM.innerHTML += "<br><br>"+legacy+" : 100% !"}
}

let list = result.list
var list2=[];list.forEach(el=>{list2.push(el.split(" - ")[0])})
var level_list2=[];level_list.forEach(el=>{level_list2.push(el.split(" - ")[0])})

let dif = level_list2.filter(x => !list2.includes(x));
let ll = dif.length
if (ll==0) {console.log("%c No new level on the Demonlist","color: limegreen;");ot.textContent="No New Levels Since Last Visit..."}
else if (ll < 150){console.log("%c"+ll+" new level on the Demonlist ↓ ↓","font-size: 13px;color: aliceblue;");h2.textContent = "New Levels: ("+ll+")"
for (let i = 0;i<ll;i++) {
let ind = level_list2.indexOf(dif[i])
console.log(level_list[ind])
ot.innerHTML += "<br><level>"+level_list[ind]+"</level>"
}
ot.innerHTML=ot.innerHTML.replace("<br>","")}

chrome.storage.sync.set({list : level_list})

let list_ll = level_list.length
for (let i = 0;i<list_ll;i++) {
    let as = level_list2[i], bs = list2[i]
    if (as !== bs) {
        let index = list2.indexOf(bs)
        console.log(as+" switch with : "+list2[index])
    }
}
})

var s_back = document.createElement("div")
s_back.style.width = "100%"
s_back.style.height = "5px"
s_back.style.backgroundColor = "aliceblue"
s_back.style.position = "fixed"
s_back.style.zIndex = "99999"
s_back.style.opacity = "0.95"
var s_prog = document.createElement("div")
s_prog.style.width = "0%"
s_prog.style.height = "5px"
s_prog.style.backgroundColor = "#46bbfb"

s_back.appendChild(s_prog)
document.querySelector("body > header").appendChild(s_back)

document.onscroll=()=>{
var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
var scrolled = (winScroll / height) * 100;
s_prog.style.width = scrolled+"%"
}









