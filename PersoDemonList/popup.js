// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

let level_list = []

//Display version
chrome.management.getSelf((e)=>{document.getElementById("version").textContent="V"+e.version})

// Elements
let o_attemptsmost = document.getElementById("o_attemptsmost"), o_recent = document.getElementById("o_recent"), o_objectsminus = document.getElementById("o_objectsminus"), list = document.getElementById("thelist"), next2user = document.getElementById("next2user"), userdisplay = document.getElementById("userdisplay"), useri = document.getElementById("username"), u_cd, edit_menu = document.getElementById("edit_menu"), edit_save = document.getElementById("edit_save"), edit_close = document.getElementById("edit_close"), e_name = document.getElementById("e_name"), add_level = document.getElementById("add_level"), nolvlyet = document.getElementById("nolvlyet"), edit_del = document.getElementById("edit_del"), wday_bank = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"], month_bank = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], e_rank = document.getElementById("e_rank"), e_title = document.getElementById("e_title"), e_attempts = document.getElementById("e_attempts"), e_progs = document.getElementById("e_progs"), e_time = document.getElementById("e_time"), e_date = document.getElementById("e_date"), e_enjoy = document.getElementById("e_enjoy"), e_url = document.getElementById("e_url"), e_id = document.getElementById("e_id"), e_length = document.getElementById("e_length"), e_song = document.getElementById("e_song"), e_songURL = document.getElementById("e_songURL"), e_objects = document.getElementById("e_objects"), e_diff = document.getElementById("e_diff"), edit_values = document.querySelector(".edit_values"), gobt = document.getElementById("gobt"), goov = document.getElementById("goov"), overview_p = document.getElementById("overview_p"), o_demons = document.getElementById("o_demons"), o_stars = document.getElementById("o_stars"), o_attempts = document.getElementById("o_attempts"), o_objects = document.getElementById("o_objects"), o_oldest = document.getElementById("o_oldest"), o_fluke = document.getElementById("o_fluke"), o_death = document.getElementById("o_death"), o_long = document.getElementById("o_long")
 online = navigator.onLine

useri.oninput=()=>{
    let v = useri.value.trim()
    userdisplay.textContent = v || "???"
    next2user.textContent = "'"+((v.charAt(v.length-1) == "s")?"":"s")+" DemonList"
    clearTimeout(u_cd)
    u_cd = setTimeout(()=>{
        chrome.storage.sync.set({$u:v})
        update_profile()
    },1000)
}

// Storage Call
chrome.storage.sync.get((r)=>{
    let usern = r.$u
    if (usern) {
        useri.value = usern
        userdisplay.textContent = usern || "???"
        next2user.textContent = "'"+((usern.charAt(usern.length-1) == "s")?"":"s")+" DemonList"
    }

    if (r.$l) r.$l.forEach((l)=>{
        let lvl = r[l], nlvl = new Level(lvl.name, r.$l.indexOf(l)+1, lvl.title, lvl.url, lvl.attempts, lvl.progs, lvl.time, lvl.date, lvl.enjoy, lvl.id, lvl.length, lvl.song, lvl.songURL, lvl.objects, lvl.diff)
        nlvl.htmlAdd()
    })

    update_overview()
    update_profile()
})

function Level(name, rank, title, url, attempts, progs, time, date, enjoy, id, length, song, songURL, objects, diff) {
    this.name = name
    this.title = title
    this.url = url
    this.attempts = attempts
    this.progs = progs
    this.time = time
    this.date = date
    let beatenDate = new Date(date)
    this.enjoy = enjoy
    this.id = id
    this.length = length
    this.song = song
    this.songURL = songURL
    this.objects = objects
    this.diff = diff

    this.save = function() {
        chrome.storage.sync.set({
            [this.name]:this,
            $l:level_list.flatMap(x => x.name)
        })
    }

    this.editName = function(newName) {
        let oldName = this.name
        this.name = newName
        chrome.storage.sync.remove(oldName)
        chrome.storage.sync.set({[newName]:this})

        document.getElementById(oldName).id = this.name
    }

    this.remove = function() {
        chrome.storage.sync.remove(this.name)
        level_list = level_list.filter(x => x.name !== this.name)
        chrome.storage.sync.set({$l:level_list.flatMap(x => x.name)})
    }

    function htmlElGet(level) {
        if (level.name == "") level.name = "Unnamed "+level_list.length
        let html = `<div class="lvl_main">
        <div class="l_top">
            <div class="lvl_img_p">
            ${(level.url.split("watch?v=")[1])
            ? '<iframe src="https://www.youtube.com/embed/'+level.url.split("watch?v=")[1]+'" loading="lazy" frameborder="0" title="Cool Video of '+(level.name||"???")+'" class="lvl_img" allow="autoplay; encrypted-media; picture-in-picture;"></iframe>'
            : '<img class="lvl_img" src="img/'+(level.diff||"hard")+'.png"></img>'
            }
            </div>
            <div class="l_display">
                <span class="lvl_name" title="${level.title||"???"}"><span id="lr" class="level${Number(rank)}">#${rank||"???"}</span> - ${level.name||"???"}</span>
                <span id="lvl_link" class="link" title="Open ${level.url||"???"}">Completion Vid</span>
            </div>
        </div>
        <div id="l_expand">
            <svg height="48" width="48" viewBox="0 -960 960 960"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg>
        </div>
        <div id="l_edit">
            <svg height="32" width="32" viewBox="0 -960 960 960"><path d="M266.118-430Q287-430 301.5-444.618q14.5-14.617 14.5-35.5Q316-501 301.382-515.5q-14.617-14.5-35.5-14.5Q245-530 230.5-515.382q-14.5 14.617-14.5 35.5Q216-459 230.618-444.5q14.617 14.5 35.5 14.5Zm214 0Q501-430 515.5-444.618q14.5-14.617 14.5-35.5Q530-501 515.382-515.5q-14.617-14.5-35.5-14.5Q459-530 444.5-515.382q-14.5 14.617-14.5 35.5Q430-459 444.618-444.5q14.617 14.5 35.5 14.5Zm213 0Q714-430 728.5-444.618q14.5-14.617 14.5-35.5Q743-501 728.382-515.5q-14.617-14.5-35.5-14.5Q672-530 657.5-515.382q-14.5 14.617-14.5 35.5Q643-459 657.618-444.5q14.617 14.5 35.5 14.5ZM480.266-80q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
        </div>
        </div>
        <div class="lvl_ci" id="ex" style="display: none;">
        <span class="lvl_att">Attempts: ${level.attempts||"???"}~</span>
        <span class="lvl_prog">Progresses: ${(level.progs == "") ? "???" : [...new Set(level.progs.split(" ").flatMap(x=>x+"%").filter(x=>x!=="%"))].join(", ")}</span>
        <span class="lvl_time">Time to Beat: ${level.time||"???"} days</span>
        <span class="lvl_date" title="${(wday_bank[beatenDate.getDay()]||"???")+" le "+(pad0(beatenDate.getDate()+1)||"???")+" "+(month_bank[beatenDate.getMonth()]||"???")+" "+(beatenDate.getFullYear()||"???")}">Beaten On: ${(pad0(beatenDate.getFullYear())||"???")+"-"+(pad0(beatenDate.getMonth()+1)||"???")+"-"+(pad0(beatenDate.getDate()+1)||"???")}</span>
        <span class="lvl_enjoy">Enjoyement: ${level.enjoy||"???"}/100</span>
        </div>
        <div class="lvl_info" id="ex" style="display: none;">
        <span class="lvl_id" style="user-select: text;">Id: ${level.id||"???"}</span>
        <span class="lvl_length">Length: ${(level.length.split(":").flatMap(x=>pad0(Number(x))).join(":") == "00" || level.length.split(":").length > 2) ? "???" : level.length.split(":").flatMap(x=>pad0(Number(x))).join(":")||"???"}</span>
        <span id="lvl_song" class="link" title="Open ${level.songURL||"???"}">Song: ${level.song||"???"}</span>
        <span class="lvl_obj">Object Count: ${level.objects||"???"}</span>
        <span class="lvl_diff">Difficulty: ${(level.diff||"???")+" Demon"}</span>
        </div>`, el = document.createElement("div")
        el.innerHTML = html
        el.className = "level"
        el.id = level.name
        el.style.order = rank
        return el
    }

    this.htmlRefresh = function(rank) {
        document.getElementById(this.name).remove()
        level_list = level_list.filter(x => x.name !== this.name)
        this.htmlAdd(rank)
    }

    this.htmlAdd = function(rank) {
        let el = htmlElGet(this)
        list.appendChild(el)

        nolvlyet.style.display = "none"

        el.querySelector("#lvl_link").onclick=()=>{chrome.windows.create({url:this.url})}
        el.querySelector("#lvl_song").onclick=()=>{chrome.windows.create({url:this.songURL})}

        let opened = false, l_ex = el.querySelector("#l_expand")
        l_ex.onclick=()=>{
            opened = !opened
            l_ex.firstElementChild.style.transform = (opened) ? "rotateZ(180deg)" : ""
            el.querySelectorAll("#ex").forEach((el)=>{
                el.style = (opened) ? "" : "display: none;" 
            })
        }

        el.querySelector("#l_edit").onclick=()=>{edit(this)}
        level_list.splice((rank==null)?level_list.length:rank, 0, this)
        // setTimeout(()=>{console.clear()},1500)
    }
}

function edit(level) {
    let isLvl = (!!level), inps = edit_menu.querySelectorAll("input"), ork
    if (isLvl) ork = level_list.flatMap(x=>x.name).indexOf(level.name)

    edit_menu.style.display = ""
    edit_menu.querySelector(".edit_header").textContent = (isLvl)?"Edit":"Create"+" Level"
    edit_save.textContent = (isLvl)?"Save":"Create"+" Level"
    edit_del.style.display = (isLvl)?"":"none"

    inps.forEach((el)=>{
        el.value = (isLvl) ? level[el.id.replace("e_","")] : ""

        el.onkeydown=e_diff.onkeydown=(e)=>{
            if (e.key == "Enter") edit_save.click()
        }
    })
    e_rank.value = (isLvl)?ork+1:""
    if (isLvl) e_diff.value = level.diff

    edit_save.onclick=()=>{
        let rk = (e_rank.value > level_list.length || e_rank.value == "") ? level_list.length : e_rank.value-1
        if (isLvl) {
            if (e_name.value !== level.name) level.editName(e_name.value)
            inps.forEach((el)=>{
                level[el.id.replace("e_","")] = (el.value == "???") ? "" : el.value.trim()
            })
            level.diff = e_diff.value

            setTimeout(()=>{level.save()},250)
            level.htmlRefresh(rk)
        } else {
            let newLevel = new Level(e_name.value, rk, e_title.value, e_url.value, e_attempts.value, e_progs.value, e_time.value, e_date.value, e_enjoy.value, e_id.value, e_length.value, e_song.value, e_songURL.value, e_objects.value, e_diff.value)
            newLevel.htmlAdd(rk)
            newLevel.save()
        }
        set_order()
        close_edit_menu()
        update_overview()
    }

    edit_del.onclick=()=>{
        document.getElementById(level.name).remove()
        level.remove()
        close_edit_menu()
        if (level_list.length == 0) nolvlyet.style.display = ""
        set_order()
    }
}

function set_order() {
    let list = level_list.flatMap(x=>x.name)
    list.forEach((lvl)=>{
        let el = document.getElementById(lvl), rank = list.indexOf(lvl), dr = el.querySelector("#lr")
        el.style.order = rank
        dr.textContent = "#"+(rank+1)
        dr.className = "level"+(rank+1)
    })
}

function close_edit_menu() {
    edit_menu.style.display = "none"
}

edit_close.onclick=close_edit_menu

add_level.onclick=()=>{edit()}

e_rank.oninput=()=>{
    e_rank.num_input_opt("-+.Ee", true, 1, Infinity)
}
e_attempts.oninput=()=>{
    e_attempts.num_input_opt("-+.Ee", true, 1, Infinity)
}
e_id.oninput=()=>{
    e_id.num_input_opt("-+.Ee", true, 1, Infinity)
}
e_objects.oninput=()=>{
    e_objects.num_input_opt("-+.Ee", true, 1, Infinity)
}
e_time.oninput=()=>{
    e_time.num_input_opt("-+Ee", true, 1, Infinity)
}
e_progs.oninput=()=>{
    e_progs.input_opt("0-9 ", "valid", 1)
    e_progs.value.trim()
}
e_length.oninput=()=>{
    e_length.input_opt("0-9:", "valid", "00:00")
}
e_name.oninput=()=>{
    e_name.input_opt("0-9a-zA-Z -", "valid", "Unammed "+level_list.length)
}

edit_values.querySelectorAll("input").forEach((el)=>{
    if (el.type == "text") {
        el.onfocus=()=>{
            if (el.value == "???") el.value = ""
        }
        el.onblur=()=>{
            if (el.value == "") el.value = "???" 
        }   
    }
})

e_rank.addEventListener("keydown",(e)=>{
    let k = e.key.toLowerCase(), v = Number(e_rank.value)
    if (k == "arrowup") e_rank.value = v-2
    else if (k == "arrowdown") e_rank.value = v+2
})

gobt.onclick=()=>{
    list.scrollTo(0, (gobt.className == "tobot") ? list.scrollHeight : 0)
}

list.onscroll=()=>{
    let t = list.scrollTop, s = list.scrollHeight/2, c = gobt.className
    if (t < s && c == "totop") {
        gobt.className = "tobot"
        gobt.title = "Go to bottom"
    }
    else if (t > s && c == "tobot") {
        gobt.className = "totop"
        gobt.title = "Go to top"
    }
}

overview_p.onclick=(e)=>{
    if (e.target == overview_p) overview_p.style.left = ""
}

goov.onclick=()=>{
    overview_p.style.left = (overview_p.style.left == "") ? "0%" : ""
}

next2user.onclick=close_p.onclick=()=>{
    profile_p.style.left = (profile_p.style.left == "") ? "0%" : ""
}

function get_rank(name) {
    return level_list.flatMap(x=>x.name).indexOf(name)+1
}

function update_overview() {
    let dem_c = [...o_demons.children], dem_ll = dem_c.length, death_c = [...o_death.children], death_ll = death_c.length, fluke_c = [...o_fluke.children], fluke_ll = fluke_c.length, long_c = [...o_long.children], long_ll = long_c.length, attm_c = [...o_attemptsmost.children], attm_ll = attm_c.length

    // demon count
    let dc = level_list.flatMap(x=>x.diff).reduce((a, b)=>{a[b]++;return a},{easy:0,medium:0,hard:0,insane:0,extreme:0})

    for (let i=0;i<dem_ll;i++) {
        let d = Object.keys(dc)[i]
        dem_c[i].innerHTML = d+" Demon: <span>"+dc[d].numSep()+"<img src='img/"+d+".png' class='small_icon'></img></span>"
    }

    // total stars
    o_stars.firstElementChild.textContent = (level_list.length*10).numSep()+"★"

    // total attempts
    let atts = level_list.flatMap(x=>Number(x.attempts||0))
    o_attempts.firstElementChild.textContent = atts.reduce((x, y)=>{return x+y},0).numSep()

    let attsm = level_list.flatMap((x)=>{return {a:Number(x.attempts), n:x.name}}).filter(x=>x.a!==0).sort((a, b)=>{return b.a-a.a})
    for (let i=0;i<attm_ll;i++) {
        let a = attsm[i]
        attm_c[i].textContent = (a) ? "(#"+get_rank(a.n)+") "+a.n+", "+a.a.numSep()+" attempts" : "No Level Yet..."
    }

    // most object
    let objs = level_list.flatMap(x=>Number(x.objects||Infinity)), obj = Math.max(...objs.filter(x=>x!==Infinity)), objm = Math.min(...objs)
    o_objects.firstElementChild.textContent = (isFinite(obj)) ? obj.numSep()+" ("+level_list.filter(x=>x.objects==obj)[0].name+")" : "No Level Yet..."
    o_objectsminus.firstElementChild.textContent = (isFinite(objm)) ? objm.numSep()+" ("+level_list.filter(x=>x.objects==objm)[0].name+")" : "No Level Yet..."

    // oldest level
    let ids = level_list.flatMap(x=>Number(x.id||Infinity)), id = Math.min(...ids), idm = Math.max(...ids.filter(x=>x!==Infinity))
    o_oldest.firstElementChild.textContent = (isFinite(id)) ? level_list.filter(x=>x.id==id)[0].name+" (Id: "+id+")" : "No Level Yet..."
    o_recent.firstElementChild.textContent = (isFinite(idm)) ? level_list.filter(x=>x.id==idm)[0].name+" (Id: "+idm+")" : "No Level Yet..."

    // best flukes
    let flukes = level_list.flatMap((x)=>{return {p: x.progs, n:x.name}}).filter(x=>x.p!=="").flatMap((x)=>{return {f:100-Number(x.p.replace("100","").trim().split(" ")[x.p.replace("100","").trim().split(" ").length-1]), n:x.n}}).sort((a, b)=>{return b.f-a.f})
    for (let i=0;i<fluke_ll;i++) {
        let f = flukes[i]
        fluke_c[i].textContent = (f) ? "(#"+get_rank(f.n)+") "+f.n+", from "+(100-f.f)+"% ("+f.f+"%)" : "No Level Yet..."
    }

    // worst deaths
    let deaths = level_list.flatMap((x)=>{return {p: x.progs, n:x.name}}).filter(x=>x.p!=="").flatMap((x)=>{return {f:100-Number(x.p.replace("100","").trim().split(" ")[x.p.replace("100","").trim().split(" ").length-1]), n:x.n}}).sort((a, b)=>{return a.f-b.f})
    for (let i=0;i<death_ll;i++) {
        let d = deaths[i]
        death_c[i].textContent = (d) ? "(#"+get_rank(d.n)+") "+d.n+", to "+(100-d.f)+"%" : "No Level Yet..."
    }

    // biggest journeys
    let days = level_list.flatMap((x)=>{return {d:Number(x.time), n:x.name}}).filter(x=>x.d!==0).sort((a, b)=>{return b.d-a.d})
    for (let i=0;i<long_ll;i++) {
        let d = days[i]
        long_c[i].textContent = (d) ? "(#"+get_rank(d.n)+") "+d.n+", "+d.d+" days" : "No Level Yet..."
    }

}

let statsEls = document.querySelectorAll("#p_info span, #p_demons"), demonsAll = document.querySelectorAll("#p_demonsAll > span")

function update_profile() {

    let u = username.value.trim()
    
    if (u) fetch('https://gdbrowser.com/api/profile/'+username.value).then(r=>r.json()).then(stats=>{
        console.log(stats)
        
        statsEls.forEach((el)=>{
            let s = stats[el.id.replace("p_","")]
            el.textContent = s||"N.A"
            el.title = s ? `${el.id.replace('p_','')} ${s}` : "Probably 0"
        })

        let demonCounts = stats.demonTypes.split(","), demonTypes = ["Easy", "Medium", "Hard", "Insane", "Extreme"]
        for (let i=0,d=demonTypes;i<5;i++) demonsAll[i].innerHTML = `${d[i]} Demon: <span>${demonCounts[i].numSep()}<img src='img/${d[i]}.png' class='small_icon'></img></span>`

    }).catch(e=>{console.log("Invalid user", e)})
    else {
        console.log("Invalid user, didn't even try")
    }
    

}