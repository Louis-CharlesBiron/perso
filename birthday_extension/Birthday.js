// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
const MSYEAR = 31536000000,
      MSDAY = 86400000

class Birthday {
    constructor(name, date, important, gift, done) {
        let ad = new Date(date)

        this.name = name // str*
        this.date = ad.getTime() // int
        this.isDone = done||0 // bool
        this.isImportant = important||0 // bool
        this.gift = gift||[] // array[str]

        //transients
        this.id = this.name+this.date
        this.el
        this.ad = ad
    }

    get formated() {
        return {n:this.name, d:this.date, c:+this.isDone, i:+this.isImportant, g:this.gift}
    }

    get id() {
        return this.id
    }

    save() {
        console.log("save")
        // chrome.storage.sync.set({
            
        // })
    }

    get currentAge() {
        return msToTime(new Date().getTime()-this.ad.getTime())[0]
    }

    get BDdateCurrentYear() {
        return new Date(`${new Date().getFullYear()}-${this.ad.getMonth()+1}-${this.ad.getDate()} 00:00`)
    }
    
    getRemaining() {
        let d = this.BDdateCurrentYear.getTime(), 
        c = new Date().getTime(),
        t = msToTime(((c/MSDAY)>>0 <= (d/MSDAY)>>0) ? d-c : (d+MSYEAR)-c)
        return t[1]==0?"TODAY":(t[1]>3||t[2]<=0)?`${t[1]} day${p(t[1])}`:`${t[1]} day${p(t[1])}, ${t[2]} hour${p(t[2])}`
    }

    createHTML() {
        let bd = document.createElement("bd"), o = this.ad.getDate()-new Date().getDate()
        bd.style.order = (o < 0) ? 31+o : o
        bd.className = "bd"
        bd.id = this.id ///
        let span = document.createElement("span")
        span.className = "bd_preview"
        let bd_edit = document.createElement("bd_edit")
        bd_edit.className = "bd_edit"

        bd.appendChild(span)
        bd.appendChild(bd_edit)
        bd_edit.appendChild(assets.children[0].cloneNode(2))

        return this.updateHTML(bd)
    }

    updateHTML(el) {
        let prev = el.querySelector(".bd_preview")
        // TODO show important

        prev.textContent = `${wday_bankEN[this.BDdateCurrentYear.getDay()].slice(0,3)}, ${this.ad.getDate()}. ${(this.getRemaining() == "TODAY")?"":"In "}${this.getRemaining()} | ${this.name}, turning ${this.currentAge+1} | ${this.gift.length} gift idea${p(this.gift.length)}`

        return this.el = el
    }
}