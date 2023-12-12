// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

const SHORT_MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
var bd_list

//On load
function onload() {
// Init get storage sync call
chrome.storage.sync.get((r)=>{
    bd_list = r.bd
    


})

//Display version
chrome.management.getSelf((e)=>{version.textContent="V"+e.version})

//Set months' order
let months_el = document.querySelectorAll(".month"), cm = new Date().getMonth()
for (let i=0;i<12;i++) months_el[(cm+i)%12].style.order=i

function manageCreatePanel(open, month) {
    if (open) {
        np_name.value = np_date.value = np_gift.value = ""
        np_important.checked = false
        np_create.setAttribute("m", month)
        newPanelBack.className = "nPB_opened"
    } else {
        newPanelBack.className = ""
    }
}

//Add "add" event
document.querySelectorAll(".m_add").forEach((el)=>{
    el.addEventListener("click", (e)=>{
        let top = e.target
        while (top.className !== "month") top = top.parentElement 
        manageCreatePanel(true, top.id)
    })
})

// Birthday creation
np_create.onclick=()=>{
    let name = np_name.value,
    date = np_date.value,
    important = np_important.checked,
    gift = np_gift.value

    if (name == '') console.log("name bad")
    if (date == '') console.log("date bad")

    if (1 == 1) {
        let m = np_create.getAttribute("m"), b = new Birthday(name, date, m, important, gift)
        bd_list.push(b)
        b.save()
        document.querySelector(`#${m} > .m_content`).appendChild(b.createHTML())
        manageCreatePanel(false)
    }
}

}onload();

