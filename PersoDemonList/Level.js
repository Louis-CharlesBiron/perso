// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

class Level {
    constructor(name, rank, title, url, attempts, progs, time, date, enjoy, id, length, song, songURL, objects, diff, creator, featureLevel, gameVersion, lazyLength) {
        this.name = name
        this.rank = rank
        this.title = title
        this.url = url
        this.attempts = attempts
        this.progs = progs
        this.time = time
        this.date = date
        this.enjoy = enjoy
        this.id = id
        this.length = length
        this.song = song
        this.songURL = songURL
        this.objects = objects
        this.diff = diff
        this.creator = creator
        this.featureLevel = featureLevel
        this.gameVersion = gameVersion
        this.lazyLength = lazyLength
    }

    getBeatenDate() {
        return new Date(this.date + " 00:00")
    }

    getDaysAgo() {
        return daysBetweenDates(this.getBeatenDate().getTime())
    }

    getLengthInSeconds = function() {
        return (this.length+"")?.split(":").reduce((a, b, i)=>a+=i?+b:b*60,0)||0
    }

    getFormatedLength = function() {
        let t = msToTime(this.getLengthInSeconds()*1000)
        return `${pad0(t[3])}:${pad0(t[4])} (${this.lazyLength})`
    }

    save = function () {
        chrome.storage.sync.set({
            [this.name]: this,
            $l: level_list.flatMap(x => x.name)
        })
    }

    editName = function (newName) {
        let oldName = this.name
        this.name = newName
        chrome.storage.sync.remove(oldName)
        chrome.storage.sync.set({ [newName]: this })

        document.getElementById(oldName).id = this.name
    }

    remove = function () {
        chrome.storage.sync.remove(this.name)
        level_list = level_list.filter(x => x.name !== this.name)
        chrome.storage.sync.set({ $l: level_list.flatMap(x => x.name) })
    }

    htmlElGet = function() {
        if (this.name == "") this.name = "Unnamed " + level_list.length

        let html = `<div class="lvl_main">
    <div class="l_top">
        <div class="lvl_img_p">
        ${(this.url.split("watch?v=")[1])
                ? '<iframe src="https://www.youtube.com/embed/' + this.url.split("watch?v=")[1] + '" loading="lazy" frameborder="0" title="Cool Video of ' + (this.name || "???") + '" class="lvl_img" allow="autoplay; encrypted-media; picture-in-picture;"></iframe>'
                : '<img class="lvl_img" src="img/' + (this.diff || "hard") + '.png"></img>'}
        </div>
        <div class="l_display">
            <span class="lvl_name" title="${this.title || "???"}"><span id="lr" class="level${this.rank}">#${this.rank || "???"}</span> - ${this.name || "???"}</span>
            <span id="lvl_link" class="link" title="Open ${this.url || "???"}">Completion Vid</span>
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
    <span class="lvl_att">Attempts: ${this.attempts || "???"}~</span>
    <span class="lvl_prog">Progresses: ${(this.progs == "") ? "???" : [...new Set(this.progs.split(" ").flatMap(x => x + "%").filter(x => x !== "%"))].join(", ")}</span>
    <span class="lvl_time">Time to Beat: ${this.time || "???"} days</span>
    <span class="lvl_date" title="${(wday_bank[this.getBeatenDate().getDay()] || "???") + " le " + (pad0(this.getBeatenDate().getDate()) || "???") + " " + (month_bank[this.getBeatenDate().getMonth()] || "???") + " " + (this.getBeatenDate().getFullYear() || "???")}">Beaten On: ${(pad0(this.getBeatenDate().getFullYear()) || "???") + "-" + (pad0(this.getBeatenDate().getMonth() + 1) || "???") + "-" + (pad0(this.getBeatenDate().getDate()) || "???")} (${!isNaN(this.getDaysAgo()) ? (this.getDaysAgo() + " days ago") : "?"})</span>
    <span class="lvl_enjoy">Enjoyement: ${this.enjoy || "???"}/100</span>
    </div>
    <div class="lvl_info" id="ex" style="display: none;">
    <span class="lvl_id">Id: ${this.id || "???"} (${this.gameVersion || "?"})</span>
    <span class="lvl_creator">Creator: ${this.creator || "???"}</span>
    <span class="lvl_length">Length: ${(this.length.split(":").flatMap(x => pad0(Number(x))).join(":") == "00" || this.length.split(":").length > 2) ? "???" : this.length.split(":").flatMap(x => pad0(Number(x))).join(":") || "???"} (${this.lazyLength || "?"})</span>
    <span id="lvl_song" class="link" title="Open ${this.songURL || "???"}">Song: ${this.song || "???"}</span>
    <span class="lvl_obj">Object Count: ${this.objects || "???"}</span>
    <span class="lvl_diff">Difficulty: ${(this.diff || "???") + " Demon"} (${featureLevels[this.featureLevel] || "?"})</span>
    </div>`, el = document.createElement("div")
        el.innerHTML = html
        el.className = "level"
        el.id = this.name
        el.style.order = this.rank
        return el
    }

    htmlRefresh = function (rank) {
        document.getElementById(this.name).remove()
        level_list = level_list.filter(x => x.name !== this.name)
        this.htmlAdd(rank)
    }

    htmlAdd = function (rank) {
        let el = this.htmlElGet()
        list.appendChild(el)
        nolvlyet.style.display = "none"
        // urls
        el.querySelector("#lvl_link").onclick = () => { chrome.windows.create({ url: this.url }) }
        el.querySelector("#lvl_song").onclick = () => { chrome.windows.create({ url: this.songURL }) }
        // expand button
        let opened = false, l_ex = el.querySelector("#l_expand")
        l_ex.onclick = () => {
            opened = !opened
            l_ex.firstElementChild.style.transform = (opened) ? "rotateZ(180deg)" : ""
            el.querySelectorAll("#ex").forEach((el) => {
                el.style = (opened) ? "" : "display: none;"
            })
        }
        // edit level button
        el.querySelector("#l_edit").onclick = () => { edit(this) }
        level_list.splice((rank == null) ? level_list.length : rank, 0, this)
        // setTimeout(()=>{console.clear()},1500)
    }
}