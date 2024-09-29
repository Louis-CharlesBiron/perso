// JS
// Canvas Dot Effects by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

const DEFAULT_CVSDE_ATTR = "_CVSDE", DEFAULT_CVSFRAMEDE_ATTR = "_CVSDE_F", DEFAULT_CTX_SETTINGS = {"imageSmoothingEnabled":false, "lineWidth":2, "fillStyle":"aliceblue", "stokeStyle":"aliceblue"}, TIMEOUT_FN = window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame, CIRC = 2*Math.PI, DEFAULT_COLOR = "aliceblue", DEFAULT_RGBA=[255,255,255,1], DEFAULT_RADIUS = 5, DEFAULT_CANVAS_WIDTH = 800, DEFAULT_CANVAS_HEIGHT = 800, DEFAULT_CANVAS_STYLES = {position:"absolute",width:"100%",height:"100%","background-color":"transparent",border:"none",outline:"none","pointer-events":"none !important","z-index":0,padding:"0 !important",margin:"0"}, DEFAULT_MOUSE_DECELERATION = 0.9, DEFAULT_MOUSE_MOVE_TRESHOLD = 0.1, DEFAULT_MOUSE_ANGULAR_DECELERATION = 0.1
let idGiver = 0

class Canvas {
    //privates
    #lastFrame = 0  // for delta time

    constructor(cvs, frame, settings, loopingCallback) {
        let frameCBR = frame?.getBoundingClientRect()??{width:DEFAULT_CANVAS_WIDTH, height:DEFAULT_CANVAS_HEIGHT}

        this._cvs = cvs                                  //html canvas el
        this._frame = frame||cvs                         //html parent el
        this._cvs.setAttribute(DEFAULT_CVSDE_ATTR, true)        //styles selector
        this._frame.setAttribute(DEFAULT_CVSFRAMEDE_ATTR, true) //styles selector
        this._ctx = this._cvs.getContext("2d", {})       //ctx
        this._settings = this.updateSettings(settings)   //ctx settings

        this._els={refs:[], defs:[]}                     //arrs of objects to .draw() | refs: [{Object._arrName:Object}], defs: [regular drawable objects]

        this._looping = false                            //loop state
        this._cb=loopingCallback                         //callback called along with the loop() fn

        this._maxDeltaTime = 0.1                         //max delta time in seconds
        this._deltaTime = null                           //useable delta time in seconds

        this._mouse = {}                                 //mouse info
        this._offset = this.updateOffset()               //cvs page offset
        
        this.setSize(frameCBR.width, frameCBR.height)    //init size
        if (frame) this.initStyles()                     //init styles
    }

    initStyles() {
        let style = document.createElement("style")
        style.appendChild(document.createTextNode(`[${DEFAULT_CVSFRAMEDE_ATTR}]{position:relative !important;}canvas[${DEFAULT_CVSDE_ATTR}]{${Object.entries(DEFAULT_CANVAS_STYLES).reduce((a,b)=>a+=`${b[0]}:${b[1]};`,"")}}`))
        this._cvs.appendChild(style)
    }

    updateOffset() {
        let {width, height, x, y} = this._cvs.getBoundingClientRect()
        return this._offset = {x:(x+width)-this.width, y:(y+height)-this.height}
    }

    startLoop() {
        if (!this._looping) {
            this._looping = true
            this.loop()
        }
    }

    loop(time) {
        this.calcDeltaTime(time)
        this.calcMouseSpeed()
        this.clear()
        this.draw()
        
        if (this._cb) this._cb() //custom callback

        if (this._looping) TIMEOUT_FN(this.loop.bind(this))
    }

    stopLoop() {
        this._looping = false
    }

    calcDeltaTime(time=0) {
        this._deltaTime = Math.min((time-this.#lastFrame)/1000, this._maxDeltaTime)
        this.#lastFrame = time
    }

    draw() {
        [...this._els.defs, ...this._els.refs.flatMap(x=>{
            let o=Object.entries(x)
            return o[0][1][o[0][0]]
        })].forEach(el=>{
            if (el.draw) {
                if (!el._ctx) el._ctx = this._ctx
                el.draw()
            }
        })
    }

    clear(x=0, y=0, width, height) {
        this._ctx.clearRect(x??0, y??0, width??this._cvs.width, height??this._cvs.height)
    }

    reset() {
        this.refs.forEach(r=>r.reset())
    }

    setSize(width, height) {
        if (width) this._cvs.width = width??window.innerWidth-20
        if (height) this._cvs.height = height??this._width/2
        this.updateSettings()
        this.updateOffset()
    }

    updateSettings(settings) {
        let st = settings||this._settings
        Object.entries(st).forEach(s=>this._ctx[s[0]]=s[1])
        return this._settings=st
    }

    add(objs, isDef) {
        let l = objs.length??1
        for (let i=0;i<l;i++) this._els[isDef?"defs":"refs"].push(objs[i]??objs)
    }

    remove(id) {
        this._els.defs = this._els.defs.filter(x=>x.id!==id)
        this._els.refs = this._els.refs.filter(x=>Object.values(x)[0].id!==id)
    }

    getObjs(instance) {
        return this._els.defs.filter(x=>x instanceof instance)
    }

    calcMouseSpeed() {
        // MOUSE SPEED
        if (isFinite(this._mouse.lastX) && isFinite(this._mouse.lastY) && this._deltaTime) {
            this._mouse.currentSpeed = this._mouse.currentSpeed*DEFAULT_MOUSE_DECELERATION+(getDist(this._mouse.x, this._mouse.y, this._mouse.lastX, this._mouse.lastY)/this._deltaTime)*(1-DEFAULT_MOUSE_DECELERATION)
            if (this._mouse.currentSpeed < DEFAULT_MOUSE_MOVE_TRESHOLD) this._mouse.currentSpeed = 0
        } else this._mouse.currentSpeed = 0

        this._mouse.lastX = this._mouse.x
        this._mouse.lastY = this._mouse.y
    }

    setmousemove(cb) {
        const onmousemove=e=>{
            // MOUSE POS
            this._mouse.x = e.x-this._offset.x,
            this._mouse.y = e.y-this._offset.y

            // MOUSE ANGLE
            let dx = this._mouse.x-this._mouse.lastX, dy = this._mouse.y-this._mouse.lastY
            if (isFinite(dx) && isFinite(dy)) {
                if (dx || dy) {
                    let angle = -toDeg(Math.atan2(dy, dx))
                    if (angle<0) angle += 360
                    this._mouse.dir = this._mouse.dir*(1-DEFAULT_MOUSE_ANGULAR_DECELERATION)+angle*DEFAULT_MOUSE_ANGULAR_DECELERATION
                }
            } else this._mouse.dir = 0

            if (typeof cb == "function") cb(this._mouse, e)
        }
        this._frame.addEventListener("mousemove", onmousemove)
        return ()=>this._frame.removeEventListener("mousemove", onmousemove)
    }

    setmousedown(cb) {
        const onmousedown=e=>{
            if (e.button==0) this._mouse.mainClicked = true
            else if (e.button==1) this._mouse.scrollClicked = true
            else if (e.button==2) this._mouse.rightClicked = true
            else if (e.button==3) this._mouse.extraBackClicked = true
            else if (e.button==4) this._mouse.extraForwardClicked = true

            if (typeof cb == "function") cb(this._mouse, e)
        }
        this._frame.addEventListener("mousedown", onmousedown)
        return ()=>this._frame.removeEventListener("mousedown", onmousedown)
    }

    setmouseup(cb) {
        const onmouseup=e=>{
            if (e.button==0) this._mouse.mainClicked = false
            else if (e.button==1) this._mouse.scrollClicked = false
            else if (e.button==2) this._mouse.rightClicked = false
            else if (e.button==3) this._mouse.extraBackClicked = false
            else if (e.button==4) this._mouse.extraForwardClicked = false

            if (typeof cb == "function") cb(this._mouse, e)
        }
        this._frame.addEventListener("mouseup", onmouseup)
        return ()=>this._frame.removeEventListener("mouseup", onmouseup)
    }

    setmouseleave(cb) {
        const onmouseleave=e=>{
            this._mouse = {x:Infinity, y:Infinity}
            if (typeof cb == "function") cb(this._mouse, e)
        }
        this._frame.addEventListener("mouseleave", onmouseleave)
        return ()=>this._frame.removeEventListener("mouseleave", onmouseleave)
    }
    
	get cvs() {return this._cvs}
	get ctx() {return this._ctx}
	get width() {return this._cvs.width}
	get height() {return this._cvs.height}
	get settings() {return this._settings}
	get cb() {return this._cb}
	get looping() {return this._looping}
	get deltaTime() {return this._deltaTime}
	get els() {return this._els}
	get mouse() {return this._mouse}
	get offset() {return this._offset}
    get defs() {return this._els.defs}
    get refs() {return this._els.refs.flatMap(x=>Object.values(x))}
    get allEls() {return this.defs.concat(this.refs)}

	set cb(_cb) {return this._cb = _cb}
	set width(w) {this.setSize(w, null)}
	set height(h) {this.setSize(null, h)}
	set mouse(m) {this._mouse = m}
}