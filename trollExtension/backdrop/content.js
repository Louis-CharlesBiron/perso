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
        this._p = {t:params?.duration??1000, c:params?.count??1, d:params?.direction??"normal"}
        this._el = el
        this._style = this.createStyle()
    }

    createStyle() {
        let s = document.createElement("style")
        s.appendChild(document.createTextNode(`
        [${this._id}="true"] {
            animation-name: barrelRoll;
            animation-duration: ${this._p.t/this._p.c}ms;
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
            this.stop(this._p.t||DEFAULT_DURATION)
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
        this._p = {t:params?.duration??1000, fileName:params?.fileName??"icon.png"}
        this._el = el
        this._img
        this._style = this.createStyle()
    }

    createStyle() {
        let s = document.createElement("style")
        s.appendChild(document.createTextNode(`
        [${this._id}="true"] {
            animation-name: jumpScare;
            animation-duration: ${this._p.t}ms;
            animation-iteration-count: 1;
            animation-direction: normal;
            animation-timing-function: linear;
        }`))
        return s
    }

    execute(delay=0) {
        setTimeout(() => {
            this._img = document.createElement("img")
            this._img.setAttribute(this._id, "true")
            this._img.src = chrome.runtime.getURL("/img/"+this._p.fileName)
            this._el.scrollTo(0,0)
            this._el.prepend(this._img)
            document.querySelector("head").appendChild(this._style)
            

            this.stop(this._p.t||DEFAULT_DURATION)
        }, delay);
    }

    stop(delay=0) {
        setTimeout(()=>{
            this._style.remove()
            this._img.remove()
        }, delay)
    }
}

class Melt {
    constructor(params, el = document.querySelector("html")) {
        this._id = "TE_MELT"
        this._p = {t:params?.duration??1000}
        this._el = el
        this._svg = this.createFilter()
        this._style = this.createStyle()
    }

    createFilter() {
        let svg = document.createElement("svg")
        svg.innerHTML = `
        <filter id="TE_MELT_SVG">
          <feTurbulence id="_M" type="turbulence" numOctaves="50" result="NOISE"></feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="50"></feDisplacementMap>
          <animate xlink:href="#_M" attributeName="baseFrequency" dur="30s" keyTimes="0;0.5;1"
          values="0.01 0.02;0.02 0.04;0.01 0.02" repeatCount="indefinite"></animate>
        </filter>`
        return svg
    }

    createStyle() {
        let s = document.createElement("style")
        s.appendChild(document.createTextNode(`
        [${this._id}="true"] {
            animation-name: melt;
            animation-duration: ${this._p.t}ms;
            animation-iteration-count: 1;
            animation-direction: normal;
            animation-timing-function: ease;
        }`))
        return s
    }

    execute(delay=0) {
        setTimeout(()=>{
            this._el.setAttribute(this._id, "true")
            document.querySelector("head").appendChild(this._svg)
            document.querySelector("head").appendChild(this._style)
            this.stop(this._p.t||DEFAULT_DURATION)
        },delay)
    }

    stop(delay=0) {
        setTimeout(()=>{
            this._el.removeAttribute(this._id)
            this._svg.remove()
            this._style.remove()
        }, delay)
    }
}

// Actions
let barrelRoll = new BarrelRoll()
let jumpscare = new Jumpscare({duration:2000, fileName:"dvs.png"})
let melt = new Melt({duration:5000})


function startWD() {
    document.onmousemove=(e)=>{
        if (e.ctrlKey) chrome.runtime.sendMessage({type:"windowDraw", x:e.x, y:e.y})
    }
}startWD()

function stopWD() {
    document.onmousemove=null
}

