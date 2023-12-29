// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

var bd_list = []

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

function managePanel(open, bd=null) {// open(bool), bd(Birthday | null)
    panelBack.className = (open) ? "nPB_opened" : ""
    panelBack.setAttribute("bdId",bd?.id||null)
    errorsDiv.textContent = ""

    if (bd) {// edit
        edit_panel.className = ""
        p_edit.className = ""
        p_delete.className = ""
        p_create.className = "hidden"
        p_title.textContent = "Edit Birthday Entry"
    } else {
        edit_panel.className = "hidden"
        p_edit.className = "hidden"
        p_delete.className = "hidden"
        p_create.className = ""
        p_title.textContent = "Create Birthday Entry"
    }

    // set values in fields
    p_name.value = bd?.name||""
    p_date.value = bd?.getDateInputFormated()||""
    p_important.checked = bd?.isImportant||false
    p_gift.value = bd?bd.gift.join(", "):""
    p_done.checked = bd?.isDone||false

    return bd
}

//Add "add" event
document.querySelectorAll(".m_add").forEach((el)=>{
    el.addEventListener("click", ()=>{
        managePanel(true)
    })
})

// Birthday client creation
function add_bd(b, isNew) {// {n:name(str), d:date(int), i:isImportant(bool), g:gift([]), c:isDone(bool)}, bool
    let bd = new Birthday(b.n, b.d, b.i, b.g, b.c), bdEl = bd.createHTML()
    
    bd_list.push(bd)
    if (isNew) bd.save()
    document.querySelector(`#${SHORT_MONTHS[new Date(bd.date).getMonth()]} > .m_content`).appendChild(bdEl)
    //Add "edit" event
    bdEl.querySelector(".bd_edit").onclick=()=>{
        managePanel(true, bd)
    }

    return bd
}

// Panel
// panel oncreate
p_create.onclick=()=>{
    let name = p_name.value,
    date = new Date(p_date.value+" 00:00").getTime(),
    important = p_important.checked,
    gift = p_gift.value.split(",").map(v=>v.trim()).filter(v=>v!==""),
    errors = validate([name == "", !isFinite(date), date > new Date().getTime(), isDuplicate(name+date)], ["The name is invalid","The birth date is invalid (incomplete)", "The birth date is invalid (impossible)", "There is already a birthday entry with the exact same name and date"], ", ")
    
    errorsDiv.textContent = errors

    if (!errors) {
        add_bd({n:name, d:date, i:important, g:gift}, true)
        managePanel(false)
    }
}

// panel oncancel
document.querySelectorAll(".p_close").forEach((el)=>{
    el.onclick=()=>{
        managePanel(false)
    }
})

// Get Birthday object from id
function getBd(id) {
    return bd_list.filter(b=>b.id == id)[0]
}

function isDuplicate(bdId, exception='') {
    return bd_list.map(b=>b.id).filter(x=>x!==exception).includes(bdId)
}

// panel onsave
p_edit.onclick=()=>{
    let bd = getBd(panelBack.getAttribute("bdId")),
    name = p_name.value,
    date = new Date(p_date.value+" 00:00").getTime()

    // validation
    errors = validate([name == "", !isFinite(date), date > new Date().getTime(), isDuplicate(name+date, bd.id)], ["The name is invalid","The birth date is invalid (incomplete)", "The birth date is invalid (impossible)", "There is already a birthday entry with the exact same name and date"], ", ")// this and the next line could be a one-liner in the if()

    errorsDiv.textContent = errors

    if (!errors) {
        // edit values
        bd.edit({i:p_important.checked, g:p_gift.value.split(",").map(v=>v.trim()).filter(v=>v!==""), c:p_done.checked})

        //edit id
        if (bd.id !== name+date) {
            setTimeout(()=>{bd.editId(name, date)},150)
        }
        managePanel(false)
    }

    
}

// panel ondelete
p_delete.onclick=()=>{
    getBd(panelBack.getAttribute("bdId")).delete()
    managePanel(false)
}

// Settings
// open settings
settingsBtn.onclick=()=>{
    sttPanel.className = "sp_opened"
}

// close settings
s_close.onclick=()=>{
    sttPanel.className = ""
}

// toggle dark mode
keepCheckbox(dm, "sync", "$dm", false, false, ()=>{console.log("dark mode on")}, ()=>{console.log("dark mode off")})



}onload();