// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

let level_list = []

// extension is onLine
let ONLINE
function checkLine() {
    ONLINE = navigator.onLine
    onLine.textContent = ONLINE ? "" : "OFFLINE" 
}checkLine()

//Display version
chrome.management.getSelf((e)=>{document.getElementById("version").textContent="V"+e.version})

// Elements y
let o_attemptsmost = document.getElementById("o_attemptsmost"), o_recent = document.getElementById("o_recent"), o_objectsminus = document.getElementById("o_objectsminus"), list = document.getElementById("thelist"), next2user = document.getElementById("next2user"), userdisplay = document.getElementById("userdisplay"), useri = document.getElementById("username"), edit_menu = document.getElementById("edit_menu"), edit_save = document.getElementById("edit_save"), edit_close = document.getElementById("edit_close"), e_name = document.getElementById("e_name"), add_level = document.getElementById("add_level"), nolvlyet = document.getElementById("nolvlyet"), edit_del = document.getElementById("edit_del"), e_rank = document.getElementById("e_rank"), e_title = document.getElementById("e_title"), e_attempts = document.getElementById("e_attempts"), e_progs = document.getElementById("e_progs"), e_time = document.getElementById("e_time"), e_date = document.getElementById("e_date"), e_enjoy = document.getElementById("e_enjoy"), e_url = document.getElementById("e_url"), e_id = document.getElementById("e_id"), e_length = document.getElementById("e_length"), e_song = document.getElementById("e_song"), e_songURL = document.getElementById("e_songURL"), e_objects = document.getElementById("e_objects"), e_diff = document.getElementById("e_diff"), edit_values = document.querySelector(".edit_values"), gobt = document.getElementById("gobt"), goov = document.getElementById("goov"), overview_p = document.getElementById("overview_p"), o_demons = document.getElementById("o_demons"), o_stars = document.getElementById("o_stars"), o_attempts = document.getElementById("o_attempts"), o_objects = document.getElementById("o_objects"), o_oldest = document.getElementById("o_oldest"), o_fluke = document.getElementById("o_fluke"), o_death = document.getElementById("o_death"), o_long = document.getElementById("o_long")

// username input .oninput
let u_cd
useri.oninput=()=>{
    let v = useri.value.trim()
    userdisplay.textContent = v || "???"
    next2user.textContent = "'"+((v.charAt(v.length-1) == "s")?"":"s")+" DemonList"
    clearTimeout(u_cd)
    u_cd = setTimeout(()=>{
        if (ONLINE) update_profile()
        //chrome.storage.sync.set({$u:v})
    },1000)
}

// Storage Call
chrome.storage.sync.get((r)=>{
    //Diplay username
    let usern = r.$u
    if (usern) {
        useri.value = usern
        userdisplay.textContent = usern || "???"
        next2user.textContent = "'"+((usern.charAt(usern.length-1) == "s")?"":"s")+" DemonList"
    }

    //Create Levels from memory
    if (r.$l) r.$l.forEach((l)=>{
        let lvl = r[l], nlvl = new Level(lvl.name, lvl.title, lvl.url, lvl.attempts, lvl.progs, lvl.time, lvl.date, lvl.enjoy, lvl.id, lvl.length, lvl.song, lvl.songURL, lvl.objects, lvl.diff, lvl.creator, lvl.featureLevel, lvl.gameVersion, lvl.lazyLength)
        nlvl.htmlAdd(r.$l.indexOf(l)+1)
    })
    set_order()

    update_overview()
    if (ONLINE) update_profile()
    displayLevelSearch(levelSearch("", "name", "match"), "name")
})

function edit(level) {
    let isLvl = !!level, inps = edit_menu.querySelectorAll("input")
    //if (isLvl) ork = get_rank(level.name) //level_list.map(x=>x.name).indexOf(level.name)

    edit_menu.style.display = ""
    edit_menu.querySelector(".edit_header").textContent = isLvl?"Edit":"Create"
    edit_save.textContent = (isLvl?"Save":"Create")+" Level"
    edit_del.style.display = (isLvl)?"":"none"

    inps.forEach((el)=>{
        el.value = (isLvl) ? level[el.id.replace("e_","")]??"" : ""

        el.onkeydown=e_diff.onkeydown=(e)=>{
            if (e.key == "Enter") edit_save.click()
        }
    })
    e_rank.value = (isLvl)?level.getRank():""
    if (isLvl) e_diff.value = level.diff

    edit_save.onclick=()=>{
        let rk = (e_rank.value > level_list.length || e_rank.value == "") ? level_list.length : e_rank.value-1
        if (isLvl) {// edit Level
            if (e_name.value !== level.name) level.editName(e_name.value)
            inps.forEach((el)=>{
                level[el.id.replace("e_","")] = (el.value.trim() == "???") ? "" : el.value.trim()
            })
            level.diff = e_diff.value

            setTimeout(()=>{level.save()},250)
            level.htmlRefresh(rk)
        } else {// create new Level
            let newLevel = new Level(e_name.value, e_title.value, e_url.value, e_attempts.value, e_progs.value, e_time.value, e_date.value, e_enjoy.value, e_id.value, e_length.value, e_song.value, e_songURL.value, e_objects.value, e_diff.value, e_creator.value, e_featureLevel.value, e_gameVersion.value, e_lazyLength.value)
            newLevel.htmlAdd(rk)
            newLevel.save()
        }
        close_edit_menu()
        update_overview()
        set_order()
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
    level_list.forEach((lvl)=>{
        let el = document.getElementById(lvl.name), dr = el.querySelector("#lr"), r = lvl.getRank()
        el.style.order = r
        dr.textContent = "#"+r
        dr.className = "level"+r
    })
}

function close_edit_menu() {
    edit_menu.style.display = "none"
}

edit_close.onclick=close_edit_menu

add_level.onclick=()=>{edit()}


let mainSongsID = [500476, 522654, 523561, 49854, 404997, 485351, 168734, 529148, 291458, 516735, 505816, 350290, 479319, 790341, 368392, 568699, 230308, 472925, 641172, 503731, 860287, 1284388]
// API call to fill some entries in level creation / edit panel
function fillLevelEntries(id, force) {
    // I Love GD Cologne :D
    fetch('https://gdbrowser.com/api/level/'+id).then(r=>r.json()).then((stats)=>{
        if (force) e_name.value=e_song.value=e_songURL.value=e_objects.value=e_id.value=""

        e_song.value ||= stats.songName||''
        e_songURL.value ||= `https://www.newgrounds.com/audio/listen/${stats.customSong||mainSongsID[+stats.songID.match(/[0-9]+/gi)[0]-1]||''}`
        if (e_date.value == "") e_date.value = getDateFormated()
        e_objects.value ||= stats.objects||''

        e_name.value = stats.name
        e_id.value = stats.id
        e_diff.value = stats.difficulty.match(/(easy|medium|hard|insane|extreme)/gi)[0].toLowerCase()||'hard'
        e_creator.value = stats.author||''
        e_gameVersion.value = stats.gameVersion||''
        e_lazyLength.value = stats.length||''
        e_featureLevel.value = !!stats.stars+[stats.featured, stats.epic, stats.legendary, stats.mythic].reduce((a, b, i)=>a+(b&&++i),0)??''

    }).catch((e)=>{
        editPanelError("There is no existing level for this id")
    })
}

function editPanelError(errorMsg) {
    errorDiv.className = "errorDivAnim"
    errorDiv.textContent = errorMsg
    setTimeout(() => {
        errorDiv.className = ""
    }, 2000);
}

searchId.onclick=(e)=>{//bloodbath, buff this, vsc, tartarus, cognition, apollo 11
    let id = e_id.value||[10565740, 3830693, 60805571, 59075347, 57600307, 83164497][random(0,5)]
    if (ONLINE) fillLevelEntries(id, e.ctrlKey)
    else editPanelError("Cannot search, no internet connection")
}

//input validation
e_rank.oninput=()=>{e_rank.num_input_opt("-+.Ee", true, 1, Infinity)}
e_attempts.oninput=()=>{e_attempts.num_input_opt("-+.Ee", true, 1, Infinity)}
e_id.oninput=()=>{e_id.num_input_opt("-+.Ee", true, 1, Infinity)}
e_objects.oninput=()=>{e_objects.num_input_opt("-+.Ee", true, 1, Infinity)}
e_time.oninput=()=>{e_time.num_input_opt("-+Ee", true, 1, Infinity)}
e_length.oninput=()=>{e_length.input_opt("0-9:", "valid", "00:00")}
e_name.oninput=()=>{e_name.input_opt("0-9a-zA-Z -", "valid", "Unammed "+level_list.length)}
e_progs.oninput=()=>{
    e_progs.input_opt("0-9 ", "valid", 1)
    e_progs.value.trim()
}

//input "???" display
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

// adjust arrow navigation for the rank input
e_rank.addEventListener("keydown",(e)=>{
    let k = e.key.toLowerCase(), v = +e_rank.value
    if (k == "arrowup") e_rank.value = v-2
    else if (k == "arrowdown") e_rank.value = v+2
})

// go to bottom / top button
gobt.onclick=()=>{
    list.scrollTo(0, (gobt.className == "tobot") ? list.scrollHeight : 0)
}

// Nav icon
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

goProfile.onclick=close_p.onclick=()=>{
    profile_p.style.left = (profile_p.style.left == "") ? "0%" : ""
}
profile_p.onclick=(e)=>{
    if (e.target == profile_p) profile_p.style.left = ""
}

function get_rank(name) {
    return level_list.map(x=>x.name).indexOf(name)+1
}

function update_overview() {
    let dem_c = [...o_demons.children], dem_ll = dem_c.length, death_c = [...o_death.children], death_ll = death_c.length, fluke_c = [...o_fluke.children], fluke_ll = fluke_c.length, long_c = [...o_long.children], long_ll = long_c.length, attm_c = [...o_attemptsmost.children], attm_ll = attm_c.length, longLc = [...o_longL.children], longLl = longLc.length , recComc = [...o_recentComp.children], recComc_ll = recComc.length

    // demon count
    let dc = level_list.map(x=>x.diff).reduce((a, b)=>{a[b]++;return a},{easy:0,medium:0,hard:0,insane:0,extreme:0})

    for (let i=0;i<dem_ll;i++) {
        let d = Object.keys(dc)[i]
        dem_c[i].innerHTML = d+" Demon: <span>"+dc[d].numSep()+"<label class='o_filterSelect' d="+d+" title='Filter by: "+d+" demon'><img src='img/"+d+".png' class='small_icon'></img></label></span>"
    }

    // filter
    let filteredLevel_list = [...level_list], filter
    
    o_demons.querySelectorAll(".o_filterSelect").forEach((el)=>{
        el.onclick=()=>{
            filter = (filter == el.getAttribute("d")) ? "" : el.getAttribute("d")

            o_filterValue.textContent = "Ranked Demons"+(filter?`(${filter})`:"")

            filteredLevel_list = level_list.filter(x=>(x.diff==filter)||!filter)

            setStats()
        }
    })

    function setStats() {
        // total stars
        o_stars.firstElementChild.textContent = (filteredLevel_list.filter(x=>x!=="0").length*10).numSep()+"★"

        // total attempts
        let atts = filteredLevel_list.map(x=>Number(x.attempts||0))
        o_attempts.firstElementChild.textContent = atts.reduce((x, y)=>{return x+y},0).numSep()

        let attsm = filteredLevel_list.map((x)=>{return {a:Number(x.attempts), n:x.name}}).filter(x=>x.a!==0).sort((a, b)=>{return b.a-a.a})
        for (let i=0;i<attm_ll;i++) {
            let a = attsm[i]
            attm_c[i].textContent = (a) ? "(#"+get_rank(a.n)+") "+a.n+", "+a.a.numSep()+" attempts" : "No Level Yet..."
        }

        // most/least object
        let objs = filteredLevel_list.map(x=>Number(x.objects||Infinity)), obj = Math.max(...objs.filter(x=>x!==Infinity)), objm = Math.min(...objs)
        o_objects.firstElementChild.textContent = (isFinite(obj)) ? obj.numSep()+" ("+filteredLevel_list.filter(x=>x.objects==obj)[0].name+")" : "No Level Yet..."
        o_objectsminus.firstElementChild.textContent = (isFinite(objm)) ? objm.numSep()+" ("+filteredLevel_list.filter(x=>x.objects==objm)[0].name+")" : "No Level Yet..."

        // oldest/most recent level
        let ids = filteredLevel_list.map(x=>Number(x.id||Infinity)), id = Math.min(...ids), idm = Math.max(...ids.filter(x=>x!==Infinity))
        o_oldest.firstElementChild.textContent = (isFinite(id)) ? filteredLevel_list.filter(x=>x.id==id)[0].name+" (Id: "+id+")" : "No Level Yet..."
        o_recent.firstElementChild.textContent = (isFinite(idm)) ? filteredLevel_list.filter(x=>x.id==idm)[0].name+" (Id: "+idm+")" : "No Level Yet..."

        // best flukes
        let flukes = filteredLevel_list.map((x)=>{return {p: x.progs, n:x.name}}).filter(x=>x.p!=="").map((x)=>{return {f:100-Number(x.p.replace("100","").trim().split(" ")[x.p.replace("100","").trim().split(" ").length-1]), n:x.n}}).sort((a, b)=>{return b.f-a.f})
        for (let i=0;i<fluke_ll;i++) {
            let f = flukes[i]
            fluke_c[i].textContent = (f) ? "(#"+get_rank(f.n)+") "+f.n+", from "+(100-f.f)+"% ("+f.f+"%)" : "No Level Yet..."
        }

        // worst deaths
        let deaths = filteredLevel_list.map((x)=>{return {p: x.progs, n:x.name}}).filter(x=>x.p!=="").map((x)=>{return {f:100-Number(x.p.replace("100","").trim().split(" ")[x.p.replace("100","").trim().split(" ").length-1]), n:x.n}}).sort((a, b)=>{return a.f-b.f})
        for (let i=0;i<death_ll;i++) {
            let d = deaths[i]
            death_c[i].textContent = (d) ? "(#"+get_rank(d.n)+") "+d.n+", to "+(100-d.f)+"%" : "No Level Yet..."
        }

        // biggest journeys
        let days = filteredLevel_list.map((x)=>{return {d:Number(x.time), n:x.name}}).filter(x=>x.d!==0).sort((a, b)=>{return b.d-a.d})
        for (let i=0;i<long_ll;i++) {
            let d = days[i]
            long_c[i].textContent = (d) ? "(#"+get_rank(d.n)+") "+d.n+", "+d.d+" days" : "No Level Yet..."
        }

        // longest levels
        let ll = filteredLevel_list.toSorted((a,b)=>b.getLengthInSeconds()-a.getLengthInSeconds())
        for (let i=0;i<longLl;i++) {
            let l = ll[i]
            longLc[i].textContent = (l) ? `(#${l.getRank()}) ${l.name}, ${l.getFormatedLength()}` : "No Level Yet..."
        }
        
        // recent completions
        let rc = filteredLevel_list.toSorted((a, b)=>b.getBeatenDate().getTime()-a.getBeatenDate().getTime())
        for (let i=0;i<recComc_ll;i++) {
            let c = rc[i]
            recComc[i].textContent = (c) ? `(#${c.getRank()}) ${c.name}, ${c.getDaysAgo()} days ago` : "No Level Yet..."
            recComc[i].title = (c) ? c.date : "No Level Yet..."
        }
    }
    setStats()
}

// profile section update
let statsEls = document.querySelectorAll("#p_info span, #p_demons"), demonsAll = document.querySelectorAll("#p_demonsAll > span")
function update_profile() {
    let u = username.value.trim()
    
    //I love GD cologne!
    if (u) fetch('https://gdbrowser.com/api/profile/'+u).then(r=>r.json()).then(stats=>{
        // adjust username
        username.value = userdisplay.textContent = stats.username
        chrome.storage.sync.set({$u:stats.username})//


        // some stats
        let all = [stats.classicDemonsCompleted, stats.classicLevelsCompleted, stats.platformerDemonsCompleted, stats.platformerLevelsCompleted].flatMap(x=>Object.entries(x)).reduce((a, b)=>(a[b[0].match(/weekly|gauntlet|daily/g)?"distinctTotal":"total"]+=b[1],a),{total:0, distinctTotal:0})
        p_all.textContent = all.total
        p_all.title = "Distinct: "+all.distinctTotal
        p_daily.textContent = stats.classicLevelsCompleted.daily||""
        p_weekly.textContent = stats.classicDemonsCompleted.weekly||""

        statsEls.forEach((el)=>{
            let s = stats[el.id.replace("p_","")]
            el.textContent ||= s||"N.A"
            el.title ||= s ? `${el.id.replace('p_','')} ${s}` : "Probably 0"
        })

        // demons
        displayProfileDemon(stats.classicDemonsCompleted, stats.platformerDemonsCompleted)

    }).catch(e=>{
        displayProfileDemon()
        clearProfileStats()
    })
    else {
        displayProfileDemon()
        clearProfileStats()
    }

    function displayProfileDemon(cDemons, pDemons) {
        let demonTypes = ["easy", "medium", "hard", "insane", "extreme"], distinctTotal={classic:0, plat:0}
        for (let i=0;i<5;i++) {
            distinctTotal["classic"]+=cDemons[demonTypes[i]]
            distinctTotal["plat"]+=pDemons[demonTypes[i]]
            demonsAll[i].innerHTML = `${demonTypes[i]}: <span class='pd_f'><span title='Classic demons'>${cDemons[demonTypes[i]].numSep()}</span><span title='Classic | Plat.'>|</span><span title='Plat. demons'>${pDemons[demonTypes[i]].numSep()}</span></span><img src='img/${demonTypes[i]}.png' class='small_icon'></img>`
        }
        p_demons.textContent += " / "+(distinctTotal["classic"]+distinctTotal["plat"])

    }

    function clearProfileStats() {
        statsEls.forEach((el)=>{
            el.textContent = "N.A"
        })
    }
}

// level search / filter

// close / open menu
s_close.onclick=closeSearchMenu

lvlSearch.onclick=()=>{
    search_menu.style.display = ""
}
function closeSearchMenu() {
    search_menu.style.display = "none"
}

function levelSearch(v, f, mode) {
    let filteredList = [], ulist = level_list.map((x, i)=>({v:x[f], i:i}))
    if (f == "gameVersion") {//gameVersion: only numbers
        ulist = ulist.map(x=>({v:x.v?.match(/[0-9.]+/g)?.[0]||null, i:x.i}))
        v = (mode == "range") ? v.match(/[0-9]{1}[.]{0,1}[0-9]+/g)||[1.0, 2.2]
        : v
    } else if (f == "date") {//date: date.getTime() and transform input in type=date
        ulist = ulist.map(x=>({v:new Date(x.v)?.getTime()||null, i:x.i}))
        v = (mode == "range") ? v.match(/[0-9]{4}[/-][0-9]{1,2}[/-][0-9]{1,2}/g)?.map(x=>new Date(x).getTime())||[new Date().getTime(), new Date().getTime()]
        : new Date(v)?.getTime()||new Date().getTime()
    } else if (f == "length") {//length : seconds
        ulist = ulist.map(x=>({v:getLengthInSeconds(x.v)||null, i:x.i}))
        v = (mode == "range") ? v.match(/[0-9:]+/g)?.map((x)=>getLengthInSeconds(x))||[0,100]
        : getLengthInSeconds(v)||0
    }
    
    if (mode == "match") filteredList = ulist.filter(x => (x.v+"")?.toLowerCase()?.includes(v?.toLowerCase()) && x.v!=null)
    else if (mode == "strict") filteredList = ulist.filter(x => x.v == v && x.v!=null)
    else if (mode == "bigger") filteredList = ulist.filter(x => x.v > +v && x.v!=null)
    else if (mode == "smaller") filteredList = ulist.filter(x => x.v < +v && x.v!=null)
    else if (mode == "range") {
        let limits = (["date", "gameVersion", "length"].includes(f)) ? v
        : v.match(/[0-9]+/g)??[0,0]
        filteredList = ulist.filter(x => (x.v >= limits[0]) && (x.v <= limits[1]) && x.v!=null)
    }
    
    return filteredList.map(x => level_list[x.i])
}

function displayLevelSearch(list, filter) {
    s_resultCount.textContent = list.length+"/"+level_list.length
    s_resultList.innerHTML = ""

    list.sort((a, b)=>a.rank-b.rank).forEach((l)=>{
        let span = document.createElement("span")
        span.className = "s_result"
        span.onclick=()=>{
            closeSearchMenu()
            let el = document.getElementById(l.name)
            el.scrollIntoView()
            el.className = "level selectedAnim"
            setTimeout(()=>{el.className = "level"},2000)
        }
        span.textContent = `(#${l.rank}) ${l.name}, ${filter}:${l[filter]}`
        s_resultList.appendChild(span)
    })
}

s_filterInput.oninput=s_filterMode.oninput=s_filterWhich.oninput=()=>{
    let filter = s_filterWhich.value
    displayLevelSearch(levelSearch(s_filterInput.value, filter, s_filterMode.value), filter)
}
