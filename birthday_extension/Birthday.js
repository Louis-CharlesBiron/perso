// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
const MSYEAR = 31536000000,
      MSDAY = 86400000,
      SHORT_MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

class Birthday {
    constructor(name, date, isImportant, gift) {
        let ad = new Date(date)

        this._name = name // str*
        this._date = ad.getTime() // int
        this._isImportant = isImportant||0 // bool
        this._gift = gift||[] // array[str]

        //transients
        this._id = this._name+this._date
        this._el
        this._ad = ad
    }

    get name() {
        return this._name
    }

    get date() {
        return this._date
    }

    get isImportant() {
        return this._isImportant
    }

    get gift() {
        return this._gift
    }

    get name() {
        return this._name
    }
    
    get id() {// id of the Birthday object : name+date
        return this._id
    }

    set id(id) {
        return this._id = id
    }
    
    get el() {// html element of the birthday
        return this._el
    }

    set el(el) {
        return this._el = el
    }

    get ad() {// birthday as Date object
        return this._ad
    }
    
    getCurrentAge() {
        return msToTime(new Date().getTime()-this._ad.getTime())[0]
    }

    getBDdateCurrentYear() {
        return new Date(`${new Date().getFullYear()}-${this._ad.getMonth()+1}-${this._ad.getDate()} 00:00`)
    }
    
    getRemaining(isToday) {
        let d = this.getBDdateCurrentYear().getTime(), c = new Date().getTime(),
        ms = ((c/MSDAY)>>0 <= (d/MSDAY)>>0) ? d-c : (d+MSYEAR)-c, t = msToTime(ms)
        return isToday ? Math.sign(ms)<1 : Math.sign(ms)<1?"TODAY":(t[1]>3||t[2]<=0)?`${t[1]} day${p(t[1])}`:`${t[1]} day${p(t[1])}, ${t[2]} hour${p(t[2])}`
    }

    getFormated() {
        return {n:this._name, d:this._date, i:+this._isImportant, g:this._gift}
    }

    getDateInputFormated() {
        return `${this.ad.getFullYear()}-${pad0(this.ad.getMonth()+1)}-${pad0(this.ad.getDate())}`
    }

    save() {
        chrome.storage.sync.get((r)=>{
            let nlist = r.$bd
            nlist.push(this._id)
            chrome.storage.sync.set({
                [this._id]: this.getFormated(),
                $bd:nlist
            })
        })
        setTimeout(()=>{chrome.runtime.sendMessage({type: "checkbd"})},500)
    }

    edit(v) {// {i:isImportant(bool), g:gift([])}
        this._isImportant = v.i??this._isImportant
        this._gift = v.g??this._gift
        chrome.storage.sync.set({
            [this._id]: this.getFormated()
        })
        
        this.updateHTML()
    }

    editId(name=this._name, date=this._date) {// name(str), date(int)
            let oldId = this._id,
            nn = name||this._name,
            nd = date||this._date
            this._id = nn+nd
            this._name = nn
            this._date = nd
            this._ad = new Date(this._date)

            chrome.storage.sync.remove(oldId)
            chrome.storage.sync.get((r)=>{
                let list = r.$bd
                list[list.indexOf(oldId)] = this._id
                chrome.storage.sync.set({
                    [this._id]: this.getFormated(),
                    $bd:list
                })
            })

            this.updateHTML()
            setTimeout(()=>{chrome.runtime.sendMessage({type: "checkbd"})},500)
    }

    delete() {
        chrome.storage.sync.get((r)=>{
            chrome.storage.sync.remove(this._id)
            chrome.storage.sync.set({
                $bd:r.$bd.filter(b=>b!==this._id)
            })
        })

        bd_list = bd_list.filter(b=>b.id!==this._id)
        this._el.remove()
    }

    createHTML() {
        let bd = document.createElement("div"), o = this._ad.getDate()-new Date().getDate()
        bd.style.order = (o < 0) ? 31+o : o
        bd.className = "bd"
        bd.id = this._id
        let span = document.createElement("span")
        span.className = "bd_preview"
        let bd_edit = document.createElement("div")
        bd_edit.className = "bd_edit"

        bd.appendChild(span)
        bd.appendChild(bd_edit)
        bd_edit.appendChild(assets.children[0].cloneNode(2))

        this._el = bd

        return this.updateHTML()
    }

    updateHTML() {
        let prev = this._el.querySelector(".bd_preview")
        // TODO show important
        prev.className = (this._isImportant) ? "bd_preview important" : "bd_preview"
        prev.className = this.getRemaining(true) ? prev.className+" isToday" : prev.className.replace(" isToday", "")
        this._el.id = this._id

        prev.textContent = `${wday_bankEN[this.getBDdateCurrentYear().getDay()].slice(0,3)}, ${this._ad.getDate()}. ${(this.getRemaining() == "TODAY")?"":"In "}${this.getRemaining()} | ${this._name}, turning ${this.getCurrentAge()+1} | ${this._gift.length} gift idea${p(this._gift.length)}`

        return this._el
    }
}