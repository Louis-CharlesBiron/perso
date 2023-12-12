// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
class Birthday {
    constructor(name, date, month, important, gift, done) {
        let ad = new Date(date+" "+month+" "+new Date().getFullYear())

        this.name = name
        this.date = ad
        this.isDone = done||0
        this.isImportant = important||0
        this.gift = gift||[]

        //transients
        this.id = this.name+this.date 
        this.el
    }

    getFormated() {
        return {n:this.name, d:this.date, c:this.isDone, i:this.isImportant, g:this.gift}
    }

    save() {
        console.log("save")
        // chrome.storage.sync.set({
            
        // })
    }
    
    
    getRemaining() {
        let d = this.date.getTime(), c = new Date().getTime(), t = msToTime((c < d) ? d-c : (d+MSYEAR)-c)
        return (t[1]>3) ? `${t[1]} day${p(t[1])}` : `${t[1]} day${p(t[1])}, ${t[2]} hour${p(t[2])}`
    }

    createHTML() {
        let bd = document.createElement("bd")
        bd.className = "bd"
        bd.id = this.id ///
        let span = document.createElement("span")
        span.className = "bd_preview"
        let bd_check = document.createElement("label")
        bd_check.className = "bd_check"
        let input = document.createElement("input")
        input.type = "checkbox"
        let bd_edit = document.createElement("bd_edit")
        bd_edit.className = "bd_edit"

        bd.appendChild(span)
        bd.appendChild(bd_check)
        bd_check.appendChild(input)
        bd.appendChild(bd_edit)
        bd_edit.appendChild(assets.children[0].cloneNode(2))

        return this.updateHTML(bd)
    }

    updateHTML(el) {
        let prev = el.querySelector(".bd_preview"),
        check = el.querySelector(".bd_check > input")
        // TODO show important

        prev.textContent = `${wday_bankEN[this.date.getDay()].slice(0,3)}, ${this.date.getDate()}. In ${this.getRemaining()} | ${this.name} | ${this.gift.length} gift idea${p(this.gift.length)}`
        check.checked = this.isDone

        return this.el = el
    }
}