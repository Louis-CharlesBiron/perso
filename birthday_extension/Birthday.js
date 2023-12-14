// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
class Birthday {
    constructor(name, date, important, gift, done) {
        let ad = new Date(date)

        this.name = name // str*
        this.date = ad.getTime() // int
        this.isDone = done||0 // bool
        this.isImportant = important||0 // bool
        this.gift = gift||[] // array[str]
        this.creationYear = new Date().getYear()

        //transients
        this.id = this.name+this.date
        this.el
        this.ad = ad
    }

    getFormated() {
        return {n:this.name, d:this.date, c:+this.isDone, i:+this.isImportant, g:this.gift}
    }

    save() {
        console.log("save")
        // chrome.storage.sync.set({
            
        // })
    }

    getCurrentAge() {
        return new Date().getYear()-this.ad.getYear()
    }
    
    getRemaining() {
        let d = new Date(`${new Date().getFullYear()}-${this.ad.getMonth()}-${this.ad.getDate()} 00:00`), c = new Date().getTime(), t = msToTime((c < d) ? d-c : (d+MSYEAR)-c)
        return (t[1]>3) ? `${t[1]} day${p(t[1])}` : `${t[1]} day${p(t[1])}, ${t[2]} hour${p(t[2])}`
    }

    createHTML() {
        let bd = document.createElement("bd")
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

        prev.textContent = `${wday_bankEN[this.ad.getDay()].slice(0,3)}, ${this.ad.getDate()}. In ${this.getRemaining()} | ${this.name}, turning ${this.getCurrentAge()+1} | ${this.gift.length} gift idea${p(this.gift.length)}`

        return this.el = el
    }
}