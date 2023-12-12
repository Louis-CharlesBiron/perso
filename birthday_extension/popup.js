// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

const SHORT_MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

//On load
function onload() {
let d = new Date(), m = d.getMonth()

//Display version
chrome.management.getSelf((e)=>{document.getElementById("version").textContent="V"+e.version})

//Set months' order
let months_el = document.querySelectorAll(".month")
for (let i=0;i<12;i++) months_el[(m+i)%12].style.order=i

//Add "add" event
document.querySelectorAll(".m_add").forEach((el)=>{
    el.addEventListener("click", (e)=>{
        let top = e.target, mContent
        while (top.className !== "m_header") top = top.parentElement
        mContent = top.nextElementSibling
        console.log(mContent)
    })
})



}onload();

