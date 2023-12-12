// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
class Birthday {
    constructor() {
        this.date
        this.name
        this.isDone
        this.id = this.name+this.date
    }


    getRemaining() {
        
    }

    createHTML() {
        let bd = document.createElement("bd")
        bd.className = "bd"
        bd.id = this.id
        let span = document.createElement("span")
        span.textContent = "" // TODO
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

        return bd
    }
}