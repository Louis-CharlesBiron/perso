// JS
// Time Since Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

// On content loaded →
document.addEventListener("DOMContentLoaded", function() {

// Declarations //
function noTOinterval(ms, callback) {
    callback()
    return setInterval(callback, ms)
}
function pad0(num) {return (num	< 10) ? '0'+ num : num}
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
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
var hexdecimal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
function keep_checkbox(el, storageType, storageName, callbackOn, callbackOff, init_checked, cb_only_onclick) {//*arg filled
    let isCbOn = (typeof callbackOn == "function"), isCbOff = (typeof callbackOff == "function"), cd
    chrome.storage[storageType].get((result)=>{
        let rchecked = result[storageName]
        if (rchecked == false) {
            el.checked = false
            if (isCbOff && !cb_only_onclick) {callbackOff()}
        }
        else if (rchecked == true) {
            el.checked = true
            if (isCbOn && !cb_only_onclick) {callbackOn()}
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
        clearTimeout(cd)
        cd = setTimeout(()=>{chrome.storage[storageType].set({[storageName]: cc})},400)
    })
    return el
}
Element.prototype.num_input_opt = function num_input_opt(invalids, replaceValue, padZero, min, max) {// valids = "1234567890-+.Ee"
    let v = Number(this.value)+""
    min = (min == undefined) ? Number(this.min) : min, max = (max == undefined) ? Number(this.max) : max
    v = v.replaceAll(new RegExp("(["+invalids+"])+","g"), "")
    v = (min !== undefined && v < min && v !== "") ? min : (max !== undefined && v > max && v !== "") ? max : v
    if (replaceValue) {this.value = (padZero && v < 10) ? "0"+v : v}
    return v
}
function ms_to_time(ms) {
    ms = Math.abs(ms)
    let y = Math.floor(ms/1000/60/60/24/365.2422),
        d = Math.floor((ms/1000/60/60/24/365.2422-y)*365.2422),
        h = Math.floor((ms/1000/60/60/24-d-(y*365.2422))*24),
        m = Math.floor((ms/1000/60/60-h-(d*24)-(y*365.2422*24))*60),
        s = Math.floor((ms/1000/60-m-(h*60)-(d*24*60)-(y*365.2422*24*60))*60)
        ms = Math.floor((ms/1000-s-(m*60)-(h*60*60)-(d*24*60*60)-(y*365.2422*24*60*60))*1000)
    return {years:y,days:d,hours:h,min:m,sec:s,mili:ms}
}
let save_count=0
function set_storage(type, name, value) {
    chrome.storage[type].set({[name]:value})
    save_status.id = "anim_ss"
    save_status.title = "Saved "+(save_count++)+" times"
    setTimeout(()=>{save_status.removeAttribute("id")},600)
    return value
}
function hexToRgb(hex){
    let c = hex.substring(1).split('')
    if (c.length == 3) {c = [c[0], c[0], c[1], c[1], c[2], c[2]]}
    c = '0x'+c.join('')
    return {r:(c>>16)&255,g:(c>>8)&255,b:c&255}
}
function regulateInput(el, on, callback, ms, noInitTO) {
    let tO
    el[on.toLowerCase()]=(e)=>{
        if (noInitTO) {noInitTO=0;callback(e)}
        clearTimeout(tO)
        tO = setTimeout(()=>{callback(e)},ms)
    }   
}
function invertColor(ir,ig,ib) {
    let mid = (ir+ig+ib)/3, v = (mid > 127) ? 0 : 255
    return "rgb("+v+" "+v+" "+v+")"
}

//Display version
chrome.management.getSelf().then((e)=>{document.querySelector(".version").textContent = "V"+e.version})

// Manage Events //
let date_input = document.querySelector("#date_input"), hours_input = document.querySelector("#hours_input"), min_input = document.querySelector("#min_input"), sec_input = document.querySelector("#sec_input"), d_set_default = document.querySelector("#d_set_default"), d_clear = document.querySelector("#d_clear"), info_title = document.querySelector("#info_title"), info_desc = document.querySelector("#info_message"), color_input = document.querySelector("#color_input"), save_status = document.querySelector(".save_status"), list = document.querySelector(".list"), status_info = document.querySelector("#status_info")
selected_info = {el:false}, active_e_list = [], action_list = [], e_ll = 0

// Global ons
document.onkeydown=(e)=>{
    if (e.key == "Backspace" && e.target.localName == "body") {del_e()}
    if (e.key == "z" && e.target.localName == "body" && e.ctrlKey && action_list.length > 0) {
        let last_index = action_list.length-1, a = action_list[last_index]
        if (a.type == "del") {
            a.el.style.display = ""
            select_box(a.el.querySelector(".box_selector"))
            chrome.storage.sync.get((result)=>{
                let r = result.e_list
                r.push({n:a.e.n,m:a.e.m,c:a.e.c,t:a.e.t})
                set_storage("sync", "e_list", r)
            })
            e_ll++
            status_info.textContent = "Total events : "+e_ll
        }
        else if (a.type == "add") {
            del_e(a)
        }
        action_list.splice(last_index, 1)
    }
}

// Display time //
let c_date = document.querySelector("#c_date"), c_time = document.querySelector("#c_time"), cupoe_lock = false
wday_bank = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
month_bank = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
dt = "days", dtp = 0, rcc = true
noTOinterval(50, ()=>{
    let d = new Date()
    c_date.textContent = pad0(d.getDate())+" "+month_bank[d.getMonth()]+" "+d.getFullYear()
    c_date.title = wday_bank[d.getDay()]
    c_time.textContent = get_time()

    //clock up on events
        active_e_list.forEach((e)=>{
            let gap = d.getTime()-new Date(e.t).getTime(), t

            if (dt == "years") {t=(Math.abs(gap)/1000/60/60/24/365.2422).toFixed(dtp)}
            else if (dt == "days") {t=(Math.abs(gap)/1000/60/60/24).toFixed(dtp)}
            else if (dt == "hours") {t=(Math.abs(gap)/1000/60/60).toFixed(dtp)}
            else if (dt == "min") {t=(Math.abs(gap)/1000/60).toFixed(dtp)}
            else if (dt == "sec") {t=(Math.abs(gap)/1000).toFixed(dtp)}
            else if (dt == "mili") {t=Math.abs(gap)}

            e.el.textContent = (Math.sign(gap) == -1 ? "In "+t+" "+dt : t+" "+dt+" ago")

            if (cupoe_lock) {
                let time = ms_to_time(gap)
                e.el2.innerHTML = (Math.sign(gap) == -1 ? "In exactly" : "It's been exactly")+" : <br>"+time.years+" years, <br>"+time.days+" days, <br>"+pad0(time.hours)+" hours, <br>"+pad0(time.min)+" minutes, <br>"+pad0(time.sec)+" seconds, <br>"+(time.mili<10?"00"+time.mili:time.mili<100?"0"+time.mili:time.mili)+" miliseconds <br>since '"+e.n+"'"
            }
    })
})

//date
d_set_default.onclick=()=>{
    let d = new Date()
    date_input.value = d.getFullYear()+"-"+pad0(d.getMonth()+1)+"-"+pad0(d.getDate())
    hours_input.value = pad0(d.getHours())
    min_input.value = pad0(d.getMinutes())
    sec_input.value = pad0(d.getSeconds())
    update_e({v:format_date(), type:"t"})
}

d_clear.onclick=()=>{clear_inputs(true)}
function clear_inputs(only_date) {
    if (!only_date) {info_title.value=info_desc.value="";color_input.value="#000000"}
    date_input.value=hours_input.value=min_input.value=sec_input.value=""
}
function format_date() {
    let d = new Date(date_input.value+" "+Number(hours_input.value)+":"+Number(min_input.value)+":"+Number(sec_input.value)).getTime()
    return (!isNaN(d)) ? d : new Date().getTime()
}
function set_e_color(el, hex) {
    let cl = hexToRgb(hex), normal_color = "rgb("+cl.r+" "+cl.g+" "+cl.b+")", h = el.querySelector(".box_header"), ii = el.querySelector(".iinfo")
    el.querySelector(".box").style.borderColor = normal_color
    h.style.backgroundColor = "rgb("+(cl.r+10 > 255 ? 255 : cl.r+10)+" "+(cl.g+10 > 255 ? 255 : cl.g+10)+" "+(cl.b+10 > 255 ? 255 : cl.b+10)+")"
    h.style.borderColor = normal_color
    h.style.color = invertColor(cl.r, cl.g, cl.b)
    ii.style.borderColor = normal_color
    ii.style.backgroundColor = "rgba("+(cl.r+10 > 255 ? 255 : cl.r+10)+", "+(cl.g+10 > 255 ? 255 : cl.g+10)+", "+(cl.b+10 > 255 ? 255 : cl.b+10)+", 0.85)"
    ii.style.color = invertColor(cl.r, cl.g, cl.b)
    el.querySelector(".box_bottom").style.borderTopColor = normal_color
}

date_input.oninput=()=>{
    update_e({v:format_date(), type:"t"})
}

hours_input.oninput = min_input.oninput = sec_input.oninput=(e)=>{
    e.target.num_input_opt("-+.Ee", true, true)
    update_e({v:format_date(), type:"t"})
}

hours_input.oncontextmenu = min_input.oncontextmenu = sec_input.oncontextmenu=(e)=>{
    e.preventDefault()
    e.target.value = "00"
}

info_title.oninput=()=>{
    update_e({v:info_title.value, type:"n"})
}

info_desc.oninput=()=>{
    update_e({v:info_desc.value, type:"m"})
}
info_desc.oncontextmenu=info_title.oncontextmenu=(e)=>{
    e.preventDefault()
    e.target.value = ""
}

regulateInput(color_input, "oninput", ()=>{update_e({v:color_input.value, type:"c"})}, 50)


let upt_cd
function update_e(new_r) {
    if (selected_info.el.id !== "box_deselector" && selected_info.el) {
        document.querySelectorAll(".box_selector").forEach((el)=>{el.disabled=true})
        let el = selected_info.el.parentElement, si=selected_info.info, aeli=active_e_list.filter(x => x.n == si.n && x.m == si.m && x.t == si.t && x.c == si.c)[0],alaeli=action_list.filter(x => x.e.n == si.n && x.e.m == si.m && x.e.t == si.t && x.e.c == si.c)[0]

        if (new_r.type == "n") {
            el.querySelector(".box_header").value = new_r.v
        }
        if (new_r.type == "m") {
            el.querySelector(".box_title").value = new_r.v
        }
        if (new_r.type == "c") {
            set_e_color(el, new_r.v)
        }
        
        aeli[new_r.type] = new_r.v
        si[new_r.type] = new_r.v
        selected_info.el.setAttribute("info_"+new_r.type, new_r.v)
        if (alaeli) {alaeli.e[new_r.type] = new_r.v}

        clearTimeout(upt_cd)
        upt_cd = setTimeout(()=>{
            chrome.storage.sync.get((result)=>{
                if (selected_info.el !== false) {
                    let r = result.e_list, aels=r.filter(x => x.n == selected_info.old_info.n && x.m == selected_info.old_info.m && x.t == selected_info.old_info.t && x.c == selected_info.old_info.c)[0]
                    aels[new_r.type] = new_r.v
                    set_storage("sync", "e_list", r)
                    selected_info.old_info[new_r.type] = new_r.v
                }
            })
            document.querySelectorAll(".box_selector").forEach((el)=>{el.removeAttribute("disabled")})
        }, 500)
    }
}


// async operations
function e_refresh() {
//event selection
    document.querySelectorAll(".box_selector").forEach((el)=>{
        el.oninput=()=>{
            select_box(el)
            if (el.id == "box_deselector") {clear_inputs()}
        }
    })

}
function select_box(el) {
    selected_info = {el:el, info:{n:el.getAttribute("info_n"),m:el.getAttribute("info_m"),c:el.getAttribute("info_c"),t:Number(el.getAttribute("info_t"))}, old_info:{n:el.getAttribute("info_n"),m:el.getAttribute("info_m"),c:el.getAttribute("info_c"),t:Number(el.getAttribute("info_t"))}}
    el.checked = true
    let d = new Date(selected_info.info.t)
    date_input.value = d.getFullYear()+"-"+pad0(d.getMonth()+1)+"-"+pad0(d.getDate())
    hours_input.value = pad0(d.getHours())
    min_input.value = pad0(d.getMinutes())
    sec_input.value = pad0(d.getSeconds())

    info_title.value = selected_info.info.n
    info_desc.value = selected_info.info.m

    color_input.value = selected_info.info.c||"#000000"
}

//delete event
function del_e(info) {
    if ((selected_info.el.id !== "box_deselector" && selected_info.el) || info) {
        let si = (info) ? info.e : selected_info.old_info, el = (info) ? info.el : selected_info.el.parentElement

        if (!info) {action_list.push({type:"del", e:{n:si.n,m:si.m,t:si.t,c:si.c}, el:el})}

        selected_info={el:false}
        el.style.display = "none"
        clear_inputs()

        chrome.storage.sync.get((result)=>{
            let r = result.e_list
            r[r.indexOf(r.filter(x => x.n == si.n && x.m == si.m && x.t == si.t && x.c == si.c)[0])] = undefined
            r = r.filter(x => x !== undefined)
            set_storage("sync", "e_list", r)
        })
        e_ll--
        status_info.textContent = "Total events : "+e_ll
    }
}
document.querySelector("#m_del_event").onclick=()=>{del_e()}


//create event
document.querySelector("#m_add_event").onclick=()=>{
    let n = "Title...", m = "Description...", c = "#77899b", t = new Date().getTime()
    if (selected_info.el.id == "box_deselector" || !selected_info.el) {
        if (date_input.value !== "") {t = format_date()}
        if (info_title.value !== "") {n = info_title.value}
        if (info_desc.value !== "") {m = info_desc.value}
        if (color_input.value !== "#000000") {c = color_input.value}
    }
    create_events([{n:n,m:m,t:t,c:c}], true)
}

//create from storage
chrome.storage.sync.get((result)=>{
    create_events(result.e_list||[])
})

function create_events(r_list, newStorage) {
    let label
    r_list.forEach((r)=>{
        let color = (newStorage && rcc) ? "#"+hexdecimal[random(0,15)]+hexdecimal[random(0,15)]+hexdecimal[random(0,15)]+hexdecimal[random(0,15)]+hexdecimal[random(0,15)]+hexdecimal[random(0,15)] : r.c

        label = document.createElement("label")
        label.className = "box_parent"
        let input = document.createElement("input")
        input.type = "radio"
        input.name = input.className = "box_selector"
        input.setAttribute("info_n", r.n)
        input.setAttribute("info_m", r.m)
        input.setAttribute("info_c", color)
        input.setAttribute("info_t", r.t)
        let iinfo = document.createElement("div"), time = ms_to_time(new Date().getTime()-new Date(r.t).getTime())
        iinfo.className = "iinfo"
        iinfo.title = "Time since :"
        iinfo.innerHTML = "It's been exactly : <br>"+time.years+" years, <br>"+time.days+" days, <br>"+time.hours+" hours, <br>"+time.min+" minutes, <br>"+time.sec+" seconds, <br>"+time.mili+" miliseconds <br>since "+r.n
        let box_i = document.createElement("span")
        box_i.className = "box_info"
        box_i.textContent = "i"
        box_i.onmouseenter=()=>{cupoe_lock=true}
        box_i.onmouseleave=()=>{cupoe_lock=false}
        let box = document.createElement("div")
        box.className = "box"
        let h_title = document.createElement("input")
        h_title.className = "box_header"
        h_title.value = r.n
        h_title.readOnly = true
        h_title.autocapitalize = false
        h_title.autocomplete = false
        h_title.spellcheck = false
        let box_c = document.createElement("div")
        box_c.className = "box_content"
        let box_title = document.createElement("textarea")
        box_title.readOnly = true
        box_title.disabled = true
        box_title.className = "box_title"
        box_title.value = r.m
        let box_b = document.createElement("div")
        box_b.className = "box_bottom"
        let box_b_c = document.createElement("div")
        box_b_c.className = "box_bottom_child"
        let box_t = document.createElement("span")
        box_t.className = "box_time"
        box_t.textContent = "0"

        list.appendChild(label)
        label.appendChild(input)
        label.appendChild(box_i)
        label.appendChild(iinfo)
        label.appendChild(box)
        box.appendChild(h_title)
        box.appendChild(box_c)
        box_c.appendChild(box_title)
        box.appendChild(box_b)
        box_b.appendChild(box_b_c)
        box_b_c.appendChild(box_t)

        set_e_color(label, color)
        active_e_list.push({el:box_t,el2:iinfo,n:r.n,m:r.m,c:color,t:r.t})

        if (newStorage) {
            chrome.storage.sync.get((result)=>{
                let rs = result.e_list
                rs.push({n:r.n,m:r.m,c:color,t:r.t})
                set_storage("sync", "e_list", rs)
            })
            select_box(input)
            action_list.push({type:"add", e:{n:r.n,m:r.m,t:r.t,c:color}, el: label})
        }
        e_ll++
    })
    status_info.textContent = "Total events : "+e_ll
    e_refresh()
    return label
}

// Settings
let gscheck = document.querySelector("#go_settings_checkbox"), opt_menu = document.querySelector(".settings_menu"), init_menu = document.querySelector(".creation_parent")
gscheck.onclick=()=>{
    if (gscheck.checked) {
        init_menu.style.display = "none"
        opt_menu.style.display = "flex"
    } else {
        opt_menu.style.display = "none"
        init_menu.style.display = "flex"
    }
}

function upt_css_var(name, v) {
    document.querySelector(':root').style.setProperty("--"+name, v);
}

keep_checkbox(document.querySelector("#dm"), "sync", "dm", ()=>{
    upt_css_var("content_c", "#121212")
    upt_css_var("box_c", "#000")
    upt_css_var("box_t_c", "aliceblue")
    upt_css_var("body_c", "linear-gradient(90deg, rgb(40 30 60), rgb(56 31 60), rgb(29 57 66))")
    upt_css_var("box_s", "20 20 20")
}, ()=>{
    upt_css_var("content_c", "")
    upt_css_var("box_c", "")
    upt_css_var("box_t_c", "")
    upt_css_var("body_c", "")
}, false, false)

keep_checkbox(document.querySelector("#rcc"), "sync", "rcc", ()=>{rcc=true}, ()=>{rcc=false}, true, false)

document.querySelectorAll("input[name='display_types']").forEach((el)=>{
    el.oninput=()=>{
        dt = set_storage("sync", "dt", el.id.replace("display_",""))
    }
})

let dtpres = document.querySelector("#dt_precision"), dtp_v = document.querySelector("#dtp_value")

regulateInput(dtpres, "oninput", ()=>{
    dtp = dtp_v.textContent = set_storage("sync", "dtp", dtpres.value)
}, 100, 1)

chrome.storage.sync.get((r)=>{
    if (!r.e_list) {set_storage("sync", "e_list", [])}
    if (r.dt) {
        document.querySelector("#display_"+r.dt).checked = true
        dtpres.value = r.dtp
        dt = r.dt
        dtp = dtp_v.textContent = r.dtp
    }
})




});