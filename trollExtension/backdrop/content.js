// JS
// Troll Extension by Louis-Charles Biron
// Please don't use nor credit this code as your own.
//
const ACTION_TYPE = {
    CSS_INJECTION:0
}, DEFAULT_DURATION = 1000;

function appendStyle(el_selector, styles, activation) {
    var css = (activation) ? el_selector+activation+"{"+styles+"}" : el_selector+"{"+styles+"}",
    el = document.querySelector(el_selector),
    style = document.createElement('style');
    if (style.styleSheet) {style.styleSheet.cssText = css;}
     else {style.appendChild(document.createTextNode(css));}
    el.appendChild(style);
}
// Actions
class Action {
    constructor(id, type) {
        this._id = id;
        this._type = type
    }

    call() {}
}

class BarrelRoll {
    constructor(params, el = document.querySelector("html")) {
        this._id = "TE_BARRELROLL"
        this._p = {t:params?.duration??1, c:params?.count??1, d:params?.direction??"normal"}
        this._el = el
        this._style = this.createStyle()
    }

    createStyle() {
        let s = document.createElement("style")
        s.appendChild(document.createTextNode(`
        [${this._id}="true"] {
            animation-name: barrelRoll;
            animation-duration: ${this._p.t/this._p.c}s;
            animation-iteration-count: ${this._p.c};
            animation-direction: ${this._p.d};
            animation-timing-function: linear;
        }`))
        return s
    }

    execute(delay=0) {
        setTimeout(()=>{
            this._el.setAttribute(this._id, "true")
            document.querySelector("head").appendChild(this._style)
            this.stop(this._p.t*1000||DEFAULT_DURATION)
        },delay)
    }

    stop(delay=0) {
        setTimeout(()=>{
            this._el.removeAttribute(this._id)
            this._style.remove()
        }, delay)
    }
}

class Jumpscare {
    constructor(params, el = document.querySelector("html")) {
        this._id = "TE_JUMPSCARE"
        this._p = {t:params?.duration??1, fileName:params?.fileName??"icon.png"}
        this._el = el
        this._img
    }

    execute(delay=0) {
        setTimeout(() => {
            this._img = document.createElement("img")
            this._img.setAttribute(this._id, "true")
            this._img.src = chrome.runtime.getURL("/img/"+this._p.fileName)
            this._el.prepend(this._img)
            
            setTimeout(()=>{
                this.stop(this._p.t*1000||DEFAULT_DURATION)
            },delay)
        }, delay);
    }

    stop(delay=0) {
        setTimeout(()=>{
            this._img.remove()
        }, delay)
    }

}

// Actions
let barrelRoll = new BarrelRoll()
let jumpscare = new Jumpscare({duration:2, fileName:"icon.png"})

