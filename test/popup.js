// JS
// Template Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
//Display version
chrome.management.getSelf((e)=>{document.getElementById("version").textContent="V"+e.versionName})

const USER = "LCB79"

fetch('https://gdbrowser.com/api/profile/'+USER).then(r=>r.json()).then(stats=>{
    console.log(stats)
}).catch(e=>{console.log(e)})







