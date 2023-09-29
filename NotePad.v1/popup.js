// JS
// Note Pad Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
document.addEventListener("DOMContentLoaded", function() {

//Display version
chrome.management.getSelf((e)=>{document.getElementById("version").textContent="Note Pad Extension V."+e.version})

// global declarations 
const s_cd = 700, invalid_chars = new RegExp("([^a-z0-9._+éàêëîïèùàöç!@#%&(),`; -])+","gi"), pstar_filled = "m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z", pstar = "m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z", QBPI = chrome.storage.sync.QUOTA_BYTES_PER_ITEM, QB = chrome.storage.sync.QUOTA_BYTES, plockopen = "M220 422h390v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326h-60q0-79 55.606-134.5t134.5-55.5Q559 136 614.5 191.575T670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422Zm0 494h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM220 916V482v434Z", plock = "M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm260.168-200Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96Z"
root = document.querySelector(":root"), html = document.querySelector("html"), pi_note_title = document.getElementById("pi_note_title"), delete_btn = document.getElementById("delete_btn"), assets = document.getElementById("assets"), bottom_p = document.querySelector(".bottom_p"), top_p = document.querySelector(".top_p"), collapse_top = document.getElementById("collapse_top"), locksvg = document.getElementById("locksvg"), storage_type_mm = document.getElementById("storage_type_mm"), ds_usep_mm = document.getElementById("ds_usep_mm"), ds_use_mm = document.getElementById("ds_use_mm"), progress_mm = document.getElementById("progress_mm"), progress = document.getElementById("progress"), ds_usep = document.getElementById("ds_usep"), ds_use = document.getElementById("ds_use"), pi_shmotoc_r = document.getElementById("pi_shmotoc_r"), pi_shmotoc = document.getElementById("pi_shmotoc"), box_info = document.getElementById("box_info"), popup_info = document.getElementById("popup_info"), of_search = document.getElementById("of_search"), check_pw_btn = document.getElementById("check_pw_btn"), check_pw = document.getElementById("check_pw"), popup_lock = document.getElementById("popup_lock"),popup_pw = document.getElementById("popup_pw"),pit = document.getElementById("pit"), note_count = document.getElementById("note_count"), fnca_sel = document.getElementById("fnca_sel"), always_saveas = document.getElementById("always_saveas"), add_note_tab = document.getElementById("add_note_tab"), import_file = document.getElementById("import_file"), download_btn = document.getElementById("download_btn"), of_r = document.getElementById("of_r"), of_s = document.getElementById("of_s"), of_f = document.getElementById("of_f"), theme_sel = document.getElementById("theme_sel"), auto_openc = document.getElementById("auto_openc"), font_sizeel = document.getElementById("font_size"), default_nameel = document.getElementById("default_name"), default_extel = document.getElementById("default_ext"), default_stel = document.getElementById("default_st"), default_pre = document.getElementById("default_pre"), default_suf = document.getElementById("default_suf"), close_popups = document.querySelectorAll("#close_popup"), settings_p = document.getElementById("settings_p"), favorite = document.getElementById("favorite"), note_title = document.getElementById("note_title"), storage_typeel = document.getElementById("storage_type"), recent_list = document.getElementById("recent_list"), tab_manager = document.getElementById("tab_manager"), main_edit = document.getElementById("main_edit"), go_mmenu = document.getElementById("go_mmenu"), add_note = document.getElementById("add_note"), mm = document.getElementById("main_menu"), modm = document.getElementById("modify_menu"), popup_back = document.getElementById("popup_back"), o_list = document.getElementById("o_list"), q_mode = document.getElementById("q_mode"), recent_txtedit = document.getElementById("recent_txtedit"), recent_name = document.getElementById("recent_name"),
time_display = document.getElementById("time_display"), txtedits = [main_edit, recent_txtedit], el_lists = [o_list, q_mode, recent_list, tab_manager], opt_el_list = [fnca_sel, always_saveas,theme_sel,auto_openc,font_sizeel,default_nameel,default_extel,default_stel,default_pre,default_suf], sis = [document.getElementById("si0"), document.getElementById("si1")], popups = [popup_back, popup_pw, popup_info], filters = [of_f, of_r, of_s], piis = document.getElementsByClassName("pii"), piis_ll = piis.length

var active_menu = mm, modm_locked = false, last_del = null, files = [], o = {}


function sendMessage(type, content) {
    chrome.runtime.sendMessage({content: content, type: type})  
}
function ivb(str) {try {atob(str)}catch (e){return false}return true}
function dit(e){if(e&&ivb(e)){let t=atob(e).split("."),l="",r=0;for(let n=0;n<t[1].length;n++){let o=t[0].slice(r,r+(k=Number(t[1].charAt(n))));r+=k,l+=String.fromCharCode(o)}return l}return null}
function readFile(file, callback) {// callback(f, v)
    let fr = new FileReader()
    fr.onload=(e)=>{callback(file, e.target.result)}
    fr.readAsText(file)
}
Element.prototype.input_opt = function(chars, charstate, replaceElementValue) {// chars(the characters to check), charstate(whether the characters are valid or invalid), replaceElementValue(if defined, will replace the element value and this arg value is the default value)
    let new_v = this.value.replaceAll(new RegExp("(["+((charstate=="valid") ? "^" : "")+chars+"])+","g"), "")
    if (replaceElementValue !== null && replaceElementValue !== false) {
        this.onblur=()=>{
            if (this.value == "") this.value = replaceElementValue
            this.oninput()
        }
        this.value = new_v
    }
    return new_v
}

Element.prototype.num_input_opt = function num_input_opt(invalids, replaceElementValue, min, max) {// valids = "1234567890-+.Ee"
    let v = this.value
    min = (isNaN(min)) ? Number(this.min) : Number(min),
    max = (isNaN(max)) ? Number(this.max) : Number(max)
    v = v.replaceAll(new RegExp("(["+invalids+"])+","g"), "")
    if (v !== "") v = (v < min) ? min : (v > max) ? max : v
    if (replaceElementValue) {
        this.onblur=()=>{
            this.value = (v == "") ? min : v
            this.oninput()
        }
    }
    return v
}
function get_files(st) { // return list of file name from storage
    return files.filter(x => x.s == st).map(x => x.t)
}
function getOpened() {
    return (active_menu == modm) ? files[main_edit.getAttribute("opened")] : null
}
function ctx_save_file(rf, e) {
    let v = rf.c+o.cp+(e.selectionText||"")+o.cs
    rf.write(v)
    txtedits.forEach((te)=>{
        let of = files[te.getAttribute("opened")]
        if (of && of.t == rf.t) te.value = v
    })
}

function pad0(num) {return (num > 9) ? num : "0"+num}
function get_time() {
    let d = new Date()
    time_display.textContent = pad0(d.getHours())+":"+pad0(d.getMinutes())+":"+pad0(d.getSeconds())
}
function getFileInfos(f) {
    let v = f&&f.c||"",
    words = v.match(/[a-z0-9]+/gi)||[],
    words_mll = words.flatMap(x => x.length),
    chars = v.length, charsNoSpace = v.replaceAll(" ","").length,
    spaces = chars-charsNoSpace,
    shortest = words[words_mll.indexOf(Math.min(...words_mll))]||"",
    longest = words[words_mll.indexOf(Math.max(...words_mll))]||"",
    mostCommonChar = Object.entries([...v].reduce((a, b)=>(a[b]=(a[b]??0)+1,a),{})).sort((a, b)=>b[1]-a[1])[0]||["", 0]
    lmd = (f&&f.m)&&new Date(f.m)||null
    lmdd = lmd&&lmd.getFullYear()+"-"+pad0(lmd.getMonth())+"-"+pad0(lmd.getDate())+" "+pad0(lmd.getHours())+":"+pad0(lmd.getMinutes())+":"+pad0(lmd.getSeconds())+","+pad0(lmd.getMilliseconds())||"Never",
    size = new Blob([v]).size
    return [words.length, chars, spaces, charsNoSpace, shortest, "("+shortest.length+")", longest, "("+longest.length+")", mostCommonChar[0], "("+mostCommonChar[1]+" | "+((mostCommonChar[1]*100/v.length)||0).toFixed(1)+"%)", lmdd, size+(size > 1 ? " bytes" : " byte"), f&&f.t||"", f&&f.e||"", f&&f.s||"", Boolean(f&&f.f||0), Boolean(f&&f.p||0)]
}

document.onkeydown=(e)=>{
    let key = e.key.toLocaleLowerCase()
    if (key == "escape") {
        e.preventDefault()
        if (active_menu == modm && !modm_locked) open_mm()
    } else if (key == "z" && e.ctrlKey && !["TEXTAREA", "INPUT"].includes(e.target.tabname) && active_menu == mm && last_del) {
        e.preventDefault()
        add_to_fs(last_del, true)
        last_del.add()
        last_del = null
    }
}

txtedits.forEach((te)=>{
    te.onkeydown=(e)=>{
        if (e.key.toLowerCase() == "tab") {
            e.preventDefault()
            te.value += "\t"
        }
    }
})

function setStorage(type, obj, errCallBack) {
    chrome.storage[type].set(obj).catch(e=>{if (typeof errCallBack == "function") errCallBack()})
    sis.forEach((el)=>{
        el.className = "save_indicator spin"
        setTimeout(()=>{el.className = "save_indicator"},600)
    })
}

chrome.contextMenus.onClicked.addListener((e)=>{
    if (e.menuItemId == "addToNote") ctx_save_file(getFile(o.qm)||get_recent_files(), e)
})

// file creation > title:unique String, storage_type:String, last modication date:Date, extension:String, private:int, favorite:bool {t:"", d:0, m:0, e:"", p:0,f:0}
function file(title, storage_type, extension, private, favorite, content, modify_date) {// max sync: 102400, max local: unlimited
    this.t = title // unique
    this.c = content||""
    this.s = storage_type
    this.m = modify_date||null
    this.e = extension
    this.p = private
    this.f = favorite
    let save_cd, title_cd, ctx_cd, temp = null

    this.write = function(value, noStorage) {
        if (o.p.includes("r") && this.m == null) {this.m = new Date().getTime();refresh_fs()}
        else this.m = new Date().getTime()
        this.c = value
        o_list.querySelector("[id='"+this.t+"'] .n_preview").textContent = this.c
        
        if (!noStorage) {
            this.save()
            if (o.qm  == "$le") this.setCtx()
        }
    }

    this.save = function() { // only file and not for title
        if (this.s == "sync") {
            clearTimeout(save_cd)
            save_cd = setTimeout(()=>{setStorage(this.s, {[this.t]:this}, ()=>{this.switch_storage("local")})},s_cd)
        } else setStorage(this.s, {[this.t]:this})
    }

    this.updateAttr = function(...val) { // {path:" e | p | f ",value:""}
        let init_p = this.p
        val.forEach((v)=>{this[v.path] = v.value})

        if ((init_p == null || this.p == null) && this.p !== init_p) {
            refresh_fs()
            this.setCtx(this.p !== null)
        }

        this.e.replaceAll(invalid_chars, "")
        this.save()
    }

    this.updateTitle = function(title, el) {
        let init_t = this.t, t = title.replaceAll(invalid_chars, ""), ii = 1
        el.value = clone_t = t

        if (init_t !== t && t !== "") {
            while (files.map(x => x.t).includes(clone_t)) {
                ii++
                clone_t = t
                clone_t = clone_t+"-"+ii
            }

            el.value = this.t = clone_t

            for (let el of el_lists) {
                let p = el.querySelector("[id='"+init_t+"']"), d = p.querySelector("[tc]")||p, da = d.getAttribute("tc")
                p.id = this.t
                if (da == "both") d.textContent = d.value = this.t
                else d[da] = this.t
            }

            if (this.s == "sync") {
                if (temp == null) temp = init_t
                clearTimeout(title_cd)
                title_cd = setTimeout(()=>{
                    chrome.storage[this.s].remove(temp)
                    temp = null
                    setStorage(this.s, {[this.t]:this,$fs:get_files(this.s)}, ()=>{this.switch_storage("local")})
                },s_cd)
            } else {
                chrome.storage[this.s].remove(init_t)
                setStorage(this.s, {[this.t]:this,$fs:get_files(this.s)})
            }
            this.setCtx()
        }
        return this.t
    }

    function removeFrom$fs(st, t) {
        chrome.storage[st].get((r)=>{
            setStorage(st, {$fs:r.$fs.filter(x => x !== t)})
        })
    }

    this.remove = function(keep_fs) {
        removeFrom$fs(this.s, this.t)
        chrome.storage[this.s].remove(this.t)
        if (o.qm == this.t) {
            o.qm = "$le"
            setStorage("sync", {$o:o})
        }
        this.setCtx(true)
        if (!keep_fs) remove_from_fs(this)
    }

    this.switch_storage = function(new_storage) {
        if (this.s !== new_storage) {
            this.remove(true)
            this.s = new_storage
            this.add(new_storage)
            manage_modm(true)
            setTimeout(()=>{manage_modm(false)},s_cd)
            storage_typeel.value = new_storage
            o_list.querySelector("[id='"+this.t+"'] .n_st").textContent = this.s
            displayBIU(null, new_storage)
        }
    }

    this.add = function(sf) {
        setStorage(sf||this.s, {[this.t]:this,$fs:get_files(this.s)})
    }

    this.setCtx = function(del, cTO) {
        if (del) sendMessage("update_ctx", get_recent_files())
        else {
            clearTimeout(ctx_cd)
            ctx_cd = setTimeout(sendMessage, (cTO||s_cd), "update_ctx", this)
        }
    }

    this.getBytesInUse = function() {
        return new Blob([JSON.stringify(this.t), JSON.stringify(this)]).size+2
    }

    this.quotaValid = function() {
        let qv = (this.getBytesInUse() < QBPI)
        //if (!qv) {console.log("BADD NOT GOOD QUOTA GRRR!!")}
        return qv
    }
}

function createNote(init_title, s, e, p, f, c, m) {
        let title = init_title, ii = 1

        while (files.map(x => x.t).includes(title)) {
            ii++
            title = init_title
            title += "-"+ii
        }
        
        let newFile = new file(title, s, e, p, f, c, m)
        add_to_fs(newFile, true)
        newFile.add()
        return newFile
}

add_note.onclick=()=>{
    let f = createNote(o.n+(files.length+1), o.s, o.e, null, 0)
    if (o.ao) open_modm(f) 
}

add_note_tab.onclick=()=>{
    let f = createNote(o.n+(files.length+1), o.s, o.e, null, 0)
    create_tab(f)
}

function fnclose_nm() {
    let el = document.querySelector(".nm_opened")
    if (el) {
        el.className = "note_menu"
        el.querySelector("#del_p").value = ""
    }
    
}

function add_to_fs(file, isNew) {
    // add to main menu list
    let note_p = document.createElement("div")
    note_p.id = file.t
    note_p.className = "note_p"
    let note_info = document.createElement("div")
    note_info.className = "note_info"
    note_info.onclick=(e)=>{
        if (![n_favorite, n_favorite.firstElementChild].includes(e.target)) {
            if (file.p !== null) open_panel(popup_pw, file)
            else open_modm(file)
        }
    }
    let n_title = document.createElement("div")
    n_title.className = "n_title"
    n_title.textContent = file.t
    n_title.title = file.t
    let n_ext = document.createElement("div")
    n_ext.className = "n_ext"
    n_ext.textContent = file.e
    n_ext.title = file.e
    n_title.setAttribute("tc","textContent")
    let n_preview = document.createElement("div")
    n_preview.className = "n_preview"
    n_preview.textContent = (file.c == "" || file.p !== null) ? "..." : file.c.slice(0, 100)
    n_preview.title = (file.c == "" || file.p !== null) ? "..." : file.c.slice(0, 100)
    let n_st = document.createElement("div")
    n_st.className = "n_st"
    n_st.textContent = file.s
    n_st.title = "Storage type"
    let n_favorite = assets.querySelector("#small_star_icon").cloneNode(8), isF = file.f
    n_favorite.setAttribute("class", "n_favorite")
    n_favorite.setAttribute("title", "Set as favorite")
    setFavorite(!isF, n_favorite.firstElementChild)
    n_favorite.onclick=()=>{
        isF = file.f
        setFavorite(isF, n_favorite.firstElementChild)
        file.updateAttr({path:"f",value:!isF})
        refresh_fs()
    }
    let note_opt = assets.querySelector("#dot_icon").cloneNode(8)
    note_opt.setAttribute("class", "note_opt btn")
    note_opt.setAttribute("title", "Options")
    note_opt.onclick=()=>{
        fnclose_nm()
        note_menu.className = (note_menu.className == "note_menu") ? "note_menu nm_opened" : "note_menu"
        if (file.p == null) {
            del_p.className = "no_opt del_p"
            del_p.disabled = true
        } else {
            del_p.className = "no_opt del_pp"
            del_p.disabled = false
        }
    }
    let note_menu = document.createElement("div")
    note_menu.className = "note_menu"
    let close_nm = assets.querySelector("#del_icon").cloneNode(8)
    close_nm.setAttribute("title", "Close")
    close_nm.setAttribute("class", "close_nm btn")
    close_nm.onclick=()=>{
        note_menu.className = "note_menu"
    }
    let del_p = document.createElement("input")
    del_p.placeholder = "Password"
    del_p.className = "no_opt del_p"
    del_p.type = "password"
    del_p.id = "del_p"
    del_p.oncontextmenu=(e)=>{
        if (!e.ctrlKey) {
            let el = e.target, i = el.type == "text"
            e.preventDefault()
            el.type = i&&"password"||"text"
            el.title = "Right click to "+(i&&"show"||"hide")
        }
    }
    let action_parent = document.createElement("div")
    action_parent.className = "action_parent"
    let del = document.createElement("div")
    del.className = "no_opt btn"
    del.title = "Delete"
    del.textContent = "Delete"
    del.onclick=()=>{
        if (dit(file.p) == del_p.value || file.p == null) {
            last_del = file
            file.remove()
        } else if (file.p !== null && dit(file.p) !== del_p.value) bad_pw(del_p)
    }    
    let download = document.createElement("div")
    download.className = "no_opt btn"
    download.title = "Download"
    download.textContent = "Download"
    download.onclick=()=>{
        if (dit(file.p) == del_p.value || file.p == null) download_file(file)
    }
    
    note_info.appendChild(n_title)
    note_info.appendChild(n_ext)
    note_info.appendChild(n_preview)
    note_info.appendChild(n_st)
    note_info.appendChild(n_favorite)
    note_p.appendChild(note_info)
    note_p.appendChild(note_opt)
    note_menu.appendChild(close_nm)
    action_parent.appendChild(download)
    action_parent.appendChild(del)
    note_menu.appendChild(action_parent)
    note_menu.appendChild(del_p)
    note_p.appendChild(note_menu)
    if (o_list.childNodes <= 0 || !isNew) o_list.appendChild(note_p)
    else o_list.insertBefore(note_p, o_list.firstElementChild)

    files.push(file)

    // add to main menu quick edit select
    if (file.p == null) {
        let opt = document.createElement("option")
        opt.value = opt.id = file.t
        opt.textContent = (file.t.length > 30) ? file.t.slice(0, 30)+"..." : file.t
        opt.setAttribute("tc","both")
        
        q_mode.appendChild(opt)

    }

    // add to modm recent list
    let recent_note = document.createElement("label")
    recent_note.className = "recent_note"
    recent_note.id = file.t
    recent_note.onclick=()=>{
        let existing_tab = tab_manager.querySelector("[id='"+file.t+"']")
        if (existing_tab) {
            existing_tab.firstElementChild.checked = true
            open_tab(file, existing_tab)
        }
        else {
            if (file.p !== null) open_panel(popup_pw, file)
            else create_tab(file)
        }
    }
    let rn_radio = document.createElement("input")
    rn_radio.type = "radio"
    rn_radio.className = "rn_radio hidden"
    rn_radio.name = "rn_radio"
    let rn_t = document.createElement("div")
    rn_t.className = "rn_t"
    rn_t.textContent = file.t
    rn_t.setAttribute("tc","textContent")

    recent_note.appendChild(rn_radio)
    recent_note.appendChild(rn_t)
    recent_list.appendChild(recent_note)

    // open in quick
    if (isNew) refresh_fs()
}

function remove_from_fs(file) {
    // remove every html file occurence
    for (let el of el_lists) {if (el.querySelector("[id='"+file.t+"']")) el.querySelector("[id='"+file.t+"']").remove()}
    files = files.filter(x => x.t !== file.t)
    refresh_fs()
}


// panel
function open_panel(el, f) {
    active_menu.className = "blur"
    el.className = "popup popened"
    if (f) el.setAttribute("opened", files.indexOf(f))
}

function close_panel(el) {
    active_menu.removeAttribute("class")
    if (el) el.className = "popup"
    popups.forEach((e)=>{
        e.className = "popup"
        e.removeAttribute("opened")
    })
    check_pw.value = ""
}

// change menu
function open_modm(file) {
        close_panel()
        active_menu = modm
        mm.className = "hidden"
        modm.removeAttribute("class")
        create_tab(file)
        displayBIU(file)
        fnclose_nm()
}

function open_mm() {
    close_panel()
    active_menu = mm
    modm.className = "hidden"
    mm.removeAttribute("class")
    refresh_fs()
    main_edit.blur()
    // clear tabs
    tab_manager.innerHTML = pit.value = ""
}

// modify menu

function open_tab(file, tab) {
    if (file) {
            note_title.textContent = file.t
            storage_typeel.value = file.s
            favorite.checked = file.f
            setFavorite(!favorite.checked)
            setLocked(file.p == null)
            main_edit.setAttribute("opened", files.indexOf(file))
            main_edit.value = file.c
            pit.value = dit(file.p)
            document.querySelectorAll(".tab").forEach((el)=>{el.className = "tab"})
            tab.className = "tab opened_tab"
            recent_list.querySelector("[id='"+getOpened().t+"'] .rn_radio").checked = true
            displayBIU(file, file.s)
    } else open_mm()
}

function manage_modm(lock) {
    modm_locked = lock
    storage_typeel.disabled = lock
    storage_typeel.tabIndex = lock&&-1||"0"
    popup_lock.style.transition = lock&&"none"||""
    if (lock) open_panel(popup_lock)
    else close_panel(popup_lock)
    favorite.disabled = lock
    favorite.tabIndex = lock&&-1||"0"
    main_edit.disabled = lock
    main_edit.tabIndex = lock&&-1||"0"
    pit.disabled = lock
    pit.tabIndex = lock&&-1||"0"
    tab_manager.querySelectorAll("input.tab_title,input.tab_ext").forEach((el)=>{
        el.disabled = lock
        el.tabIndex = lock&&-1||"0"
    })
}

function create_tab(file) {
    let select_tab = document.createElement("input")
    select_tab.className = "select_tab hidden"
    select_tab.type = "radio"
    select_tab.name = "active_tab"
    select_tab.checked = true
    let tab = document.createElement("div")
    tab.className = "tab"
    tab.id = file.t
    tab.onclick=(e)=>{
        if (![close_tab, svg, svg.firstElementChild].includes(e.target)) {
            select_tab.checked = true
            open_tab(file, tab)
        }
    }
    let tab_c = document.createElement("div")
    tab_c.className = "tab_c"
    let tab_title = document.createElement("input")
    tab_title.type = "text"
    tab_title.className = "tab_title"
    tab_title.maxLength = "20"
    tab_title.value = file.t
    tab_title.setAttribute("tc","value")
    tab_title.oninput=(e)=>{
        let v = e.target.value
        tab_title.value = v
        note_title.textContent = file.updateTitle(v, tab_title)
    }
    tab_title.onblur=()=>{
        if (tab_title.value == "") file.updateTitle(o.n, tab_title)
    }
    let tab_ext = document.createElement("input")
    tab_ext.className = "tab_ext"
    tab_ext.type = "text"
    tab_ext.value = file.e
    tab_ext.oninput=()=>{
        let v = tab_ext.value = tab_ext.input_opt("a-zA-Z", "valid", "txt").toLocaleLowerCase()
        if (v !== "") file.updateAttr({path:"e",value:v})
        o_list.querySelector("[id='"+getOpened().t+"'] .n_ext").textContent = "."+v
    }
    let close_tab = document.createElement("div"), svg = assets.querySelector("#small_del_icon").cloneNode(8)
    close_tab.className = "close_tab btn"
    close_tab.onclick=()=>{
        tab.remove()
        let rescue_tab = tab_manager.firstElementChild
        
        if (rescue_tab) {
            rescue_tab.firstElementChild.checked = true
            open_tab(getFile(rescue_tab.id), rescue_tab)
        } else open_tab(false)
    }

    tab.appendChild(select_tab)
    tab.appendChild(tab_c)
    tab_c.appendChild(tab_title)
    tab_c.appendChild(tab_ext)
    tab_c.appendChild(close_tab)
    close_tab.appendChild(svg)
    tab_manager.appendChild(tab)

    open_tab(file, tab)
}

// on popup open
function recreate_sfile(sf) {
    let nfile = new file(sf.t, sf.s, sf.e, sf.p, sf.f, sf.c, sf.m)
    add_to_fs(nfile)
}
function set_theme(isDark) {
    if (isDark) {
        html.style.filter = "invert(1) hue-rotate(180deg)"
        root.style.setProperty('--blur', 'blur(0.5px) brightness(1.1)')
        root.style.setProperty('--cb_bg', '#3f4144')
        root.style.setProperty('--txt_c', '#0c0c0c')
    } else {
        html.removeAttribute("style")
        root.style.setProperty("--blur", "blur(0.5px) brightness(0.8)")
        root.style.setProperty('--cb_bg', 'aliceblue')
        root.style.setProperty('--txt_c', '#494949')
    }
}
chrome.storage.sync.get((r)=>{
    o = r.$o
    if (o.t == "d") set_theme(true)

    chrome.storage.local.get((lr)=>{
        if (lr.$fs) lr.$fs.forEach((f)=>{recreate_sfile(lr[f])})
        if (r.$fs) r.$fs.forEach((f)=>{recreate_sfile(r[f])})

        setSettingsFromStorage()
        refresh_fs()
    
    })
})

function get_recent_files(limit) {
    let list = Array.from(files)
    list = list.sort((a, b) => b.m - a.m).slice(0, limit||Infinity).filter(f => (f.p == null))
    return (limit > 0) ? list : list[0]
}
function getFile(name) {
    return files.filter(x => x.t == name)[0]
}

function refresh_fs() {// automatically plays when all files have been retrieved from storage
    let qf = (q_mode.value == "$le") ? get_recent_files() : getFile(q_mode.value)
    if (qf) {
        recent_txtedit.setAttribute("opened",files.indexOf(qf))
        recent_txtedit.disabled = false
        recent_name.onclick=()=>{open_modm(qf)}
        recent_name.textContent = qf.t
        recent_name.title = "Open "+qf.t+" ..."
        recent_txtedit.value = qf.c
        qf.setCtx(false, 1)
    } else {
        recent_txtedit.setAttribute("opened",-1)
        recent_txtedit.disabled = true
        recent_txtedit.value = "No file found, create one to edit here..."
        recent_name.textContent = "No File Selected"
        q_mode.value = o.qm = "$le"
        save_opt()
        sendMessage("update_ctx", null)
    }


    
    let search_f = of_search.value.toLowerCase()
    o_list.querySelectorAll(".note_p").forEach((n)=>{
        let f = getFile(n.id), e1 = n.querySelector(".n_preview"), e2 = n.querySelector(".n_title"), e3 =  n.querySelector(".n_ext")

        e1.textContent = (f.p !== null) ? "?" : (f.c == "") ? "..." : f.c.slice(0, 100)
        e1.title = (f.c == "" || f.p !== null) ? "..." : f.c.slice(0, 100)
        e2.title = f.t
        e3.textContent = e3.title = (f.p !== null) ? "?" : f.e
        n.querySelector(".n_st").textContent = (f.p !== null) ? "?" : f.s
        n.querySelector("#small_star_icon").style.visibility = (f.p !== null) ? "hidden" : ""

        n.className = "note_p"
        if ((o.p.includes("r") && f.m == null) || (o.p.includes("f") && !f.f) || (o.p.includes("s") && f.s !== "sync") || (!f.t.toLowerCase().includes(search_f))) n.className = "note_p hidden"
    })

    note_count.style.fontVariantNumeric = (search_f == o.p == "") ? "oldstyle-nums" : ""
    note_count.textContent = "("+o_list.querySelectorAll(".note_p:not(.hidden)").length+"/"+files.length+")"
}

go_mmenu.onclick=open_mm


// writing
recent_txtedit.oninput=main_edit.oninput=(e)=>{
    if (!(e.target == main_edit && active_menu == mm)) te_save(e.target)
}

function te_save(el) {
    files[el.getAttribute("opened")].write(el.value)
}


// actiONs 
q_mode.oninput=()=>{
    o.qm = q_mode.value
    save_opt()
    refresh_fs()
}

storage_typeel.oninput=()=>{
    let f = getOpened()
    if (storage_typeel.value == "sync" && !f.quotaValid()) {storage_typeel.value = "local"}
    else f.switch_storage(storage_typeel.value)
    o_list.querySelector("[id='"+getOpened().t+"'] .n_st").textContent = storage_typeel.value
}

function setLocked(isLocked) {locksvg.firstElementChild.setAttribute("d", (isLocked) ? plockopen : plock)}
function setFavorite(isF, el) {
    favorite.nextElementSibling.querySelector("path").setAttribute("d", (isF) ? pstar : pstar_filled)
    if (el) el.setAttribute("d", (isF) ? pstar : pstar_filled)

}
favorite.onclick=()=>{
    setFavorite(!favorite.checked, o_list.querySelector("[id='"+getOpened().t+"'] #small_star_icon > path"))
    getOpened().updateAttr({path:"f",value:Number(favorite.checked)})
}

settings_p.onclick=()=>{
    let opened = (popup_back.className == "popened")
    if (opened) close_panel()
    else open_panel(popup_back)
}
close_popups.forEach((el)=>{
    el.onclick=()=>{close_panel()}
}) 

popups.forEach((el)=>{
    el.onclick=(e)=>{
        if (e.target == el) close_panel()
    }
})

// GLOBAL SETTINGS
function setSettingsFromStorage() {
    theme_sel.value = o.t
    auto_openc.checked = o.ao
    always_saveas.checked = o.d
    font_sizeel.value = o.f
    default_nameel.value = o.n
    default_extel.value = o.e
    default_stel.value = o.s||"local"
    default_pre.value = o.cp
    default_suf.value = o.cs
    fnca_sel.value = o.c
    for (c of o.p.split("")) document.getElementById("of_"+c).checked = true
    for (te of txtedits) te.style.fontSize = o.f+"px"
    q_mode.value = o.qm||"$le"

    theme_sel.addEventListener("input", ()=>{set_theme(theme_sel.value == "d")})
}

let opt_cd
function save_opt() {
    clearTimeout(opt_cd)
    opt_cd = setTimeout(()=>{setStorage("sync", {$o:o})},s_cd)
}


opt_el_list.forEach((el)=>{
    el.oninput=()=>{
        o[el.getAttribute("o")] = (el.type == "checkbox") ? Number(el.checked) : el.value
        save_opt()
    }
})

of_f.oninput = of_r.oninput = of_s.oninput=()=>{
    o.p = ""
    for (el of filters) o.p += (el.checked)&&el.id.replace("of_","")||""
     
    save_opt()
    refresh_fs()
}

of_search.oninput=refresh_fs

function download_file(f) {
    let blob = new Blob([f.c], {type: "text/"}), url = URL.createObjectURL(blob)
    chrome.downloads.download({url:url, filename:f.t+"."+f.e, conflictAction:o.c, saveAs:Boolean(o.d)})
}

download_btn.onclick=()=>{
    download_file(getOpened())
}

delete_btn.onclick=()=>{
    let f = getOpened()
    last_del = f
    f.remove()
    open_mm()
}

import_file.oninput=()=>{
    let ifs = import_file.files, ifs_ll = ifs.length
    for (let i=0;i<ifs_ll;i++) {
        let f = ifs[i]
        readFile(f, (f, v)=>{
            let fv = f.name.split("."), ext = fv[fv.length-1]
            import_file.value = ""
            createNote(f.name.slice(0, f.name.length-ext.length-1), (ifs_ll < 8 && v.length <= 7500) ? o.s : "local", ext||"txt", null, 0, v, f.lastModified)
        })
    }
}

get_time()
setInterval(get_time,500)


pit.oninput=()=>{setLocked((pit.value==""));let t=pit.value,e="",a=".";for(let l=0;l<t.length;l++)e+=t.charCodeAt(l),a+=(t.charCodeAt(l)+"").length;getOpened().updateAttr({path:"p",value:(e=="")?null:btoa(e+a)})};
pit.oncontextmenu=check_pw.oncontextmenu=(e)=>{
    if (!e.ctrlKey) {
        let el = e.target, i = el.type == "text"
        e.preventDefault()
        el.type = i&&"password"||"text"
        el.title = "Right click to "+(i&&"show"||"hide")
    }
}

check_pw.onkeydown=(e)=>{if (e.key == "Enter") check_pw_btn.click()}

function bad_pw(el) {
    el.style.animation = "bpw 0.6s 1 forwards normal cubic-bezier(0.36, 0.3, 0.74, 0.75)"
    setTimeout(()=>{
        el.removeAttribute("style")
    },610)
}

check_pw_btn.onclick=()=>{
    let f = files[popup_pw.getAttribute("opened")]
    if (check_pw.value == dit(f.p)) {
        check_pw.value = ""
        open_modm(f)
        close_panel()
    } else bad_pw(check_pw)
}

collapse_top.onclick=()=>{
    top_p.className = (top_p.className == "top_p") ? "top_p top_p_collapsed" : "top_p"
    collapse_top.className = (collapse_top.className == "btn") ? "btn flip" : "btn"
    bottom_p.style.height = (bottom_p.style.height !== "100%") ? "100%" : ""
}

font_sizeel.oninput=()=>{
    font_sizeel.num_input_opt("-+Ee", true)
    o.f = font_sizeel.value
    for (te of txtedits) te.style.fontSize = o.f+"px"
    save_opt()
}

box_info.onclick=()=>{
    let f = getOpened()
    open_panel(popup_info, f)
    let infos = getFileInfos(f)
    for (let i=0;i<piis_ll;i++) piis[i].textContent = infos[i]
    pi_note_title.textContent = f.t
}

pi_shmotoc.oninput=()=>{
    let v = getOpened().c, regex = new RegExp("["+pi_shmotoc.value+"]", "g"), r = v.match(regex)||[], r_ll = r.length, v_ll = v.length
    pi_shmotoc_r.textContent = (pi_shmotoc.value == "") ? "Enter a character..." : r_ll+" / "+v_ll+" ("+(isNaN(Math.floor(r_ll*100/v_ll)) ? "0" : (r_ll*100/v_ll).toFixed(1))+"%)"
}

function displayBIU(f, storageType) {
    let type = f&&f.s||storageType||"sync"
    if (f) {
        let fb = f.getBytesInUse()
        ds_use.textContent = (fb/1000).toFixed(3)+" / "+(QBPI/1000)+"KB"
        ds_usep.textContent = (type == "sync") ? "("+Math.round(fb*100/QBPI)+"%)" : f.quotaValid()&&"Syncable"||"Unsyncable"
        progress.style.strokeDasharray = (fb*327/QBPI)+", 911, 999"
    } else chrome.storage[type].getBytesInUse((b)=>{
        ds_use_mm.textContent = (b/1000).toFixed(3)+((type == "sync") ? " / "+(QB/1000)+"KB" : "KB")
        ds_usep_mm.textContent = (type == "sync") ? "("+Math.round(b*100/QB)+"%)" : ""
        progress_mm.style.strokeDasharray = (b*414/QB)+", 911, 999"
    })
}displayBIU()

chrome.storage.onChanged.addListener(()=>{
    displayBIU(getOpened(), storage_type_mm.value)
})

storage_type_mm.oninput=()=>{
    displayBIU(null, storage_type_mm.value)
}






});