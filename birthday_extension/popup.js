// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

const SHORT_MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
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

function managePanel(open, isCreation, v={n:'',d:'',i:'',g:[],c:''}) {// open(bool), isCreation(bool), values(obj)
    panelBack.className = (open) ? "nPB_opened" : ""

    if (isCreation) {
        edit_panel.className = "hidden"
        p_edit.className = "hidden"
        p_delete.className = "hidden"
        p_create.className = ""
        p_title.textContent = "Create Birthday Entry"
    } else {
        edit_panel.className = ""
        p_edit.className = ""
        p_delete.className = ""
        p_create.className = "hidden"
        p_title.textContent = "Edit Birthday Entry"
    }

    p_name.value = v.n
    p_date.value = v.d
    p_important.checked = v.i
    p_gift.value = v.g.join(", ")
    p_done.checked = v.c
}

//Add "add" event
document.querySelectorAll(".m_add").forEach((el)=>{
    el.addEventListener("click", ()=>{
        managePanel(true, true)
    })
})

// Birthday client creation
function add_bd(b, isNew) {// {n:name(str), d:date(int), i:isImportant(bool), g:gift([]), c:isDone(bool)}
    let bd = new Birthday(b.n, b.d, b.i, b.g, b.c)
    
    bd_list.push(bd)
    if (isNew) bd.save()
    document.querySelector(`#${SHORT_MONTHS[new Date(bd.date).getMonth()]} > .m_content`).appendChild(bd.createHTML())

    return bd
}

// Panel
// panel oncreate
let errorsDiv = document.getElementById("errorsDiv")
p_create.onclick=()=>{
    let name = p_name.value,
    date = new Date(p_date.value+" 00:00").getTime(),
    important = p_important.checked,
    gift = p_gift.value,
    errors = validate([name == "", !isFinite(date), date > new Date().getTime()], ["The name is invalid","The birth date is invalid (incomplete)", "The birth date is invalid (impossible)"], ", ")
    
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

// panel onsave
p_edit.onclick=()=>{

}

// panel ondelete
p_delete.onclick=()=>{

}




}onload();