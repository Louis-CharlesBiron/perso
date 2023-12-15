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
    //load stored birthdays
    bd_list = r.$bd.map(b=>add_bd(r[b]))
    

})

//Display version
chrome.management.getSelf((e)=>{version.textContent="V"+e.version})

//Set months' order
let months_el = document.querySelectorAll(".month"), cm = new Date().getMonth()
for (let i=0;i<12;i++) months_el[(cm+i)%12].style.order=i

function manageCreatePanel(open) {
    if (open) {
        np_name.value = np_date.value = np_gift.value = ""
        np_important.checked = false
        newPanelBack.className = "nPB_opened"
    } else {
        newPanelBack.className = ""
    }
}

//Add "add" event
document.querySelectorAll(".m_add").forEach((el)=>{
    el.addEventListener("click", ()=>{
        manageCreatePanel(true)
    })
})

// Birthday client creation
function add_bd(b, isNew) {// name:str, date:int, isImp:bool, gift:[], isDone:bool
    let bd = new Birthday(b.name, b.date, b.isImportant, b.gift, b.isDone)
    
    bd_list.push(bd)
    if (isNew) bd.save()
    document.querySelector(`#${SHORT_MONTHS[new Date(b.date).getMonth()]} > .m_content`).appendChild(bd.createHTML())

    return bd
}

// Creation panel onclick
let errorsDiv = document.getElementById("errorsDiv")
np_create.onclick=()=>{
    let name = np_name.value,
    date = new Date(np_date.value+" 00:00").getTime(),
    important = np_important.checked,
    gift = np_gift.value,
    errors = validate([name == "", !isFinite(date), date > new Date().getTime()], ["The name is invalid","The birth date is invalid (incomplete)", "The birth date is invalid (impossible)"], ", ")
    
    errorsDiv.textContent = errors

    if (!errors) {
        add_bd({name:name, date:date, isImportant:important, gift:gift}, true)
        manageCreatePanel(false)
    }
}




}onload();