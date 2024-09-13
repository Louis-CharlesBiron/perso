const DEFAULT_CANVAS_LENGTH = 500, DEFAULT_CTX_SETTINGS = {"imageSmoothingEnabled":false, "lineWidth":2, "fillStyle":"aliceblue", "stokeStyle":"aliceblue"}, TIMEOUT_FN = window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame
let idGiver = 0

class Canvas {
    //privates
    #lastFrame = 0  // for delta time

    constructor(cvs, settings, width, height, loopingCallback) {
        this._cvs = cvs                                  //html canvas el
        this._ctx = this._cvs.getContext("2d", {})       //ctx
        this._cvs.width = width||DEFAULT_CANVAS_LENGTH   //width
        this._cvs.height = height||DEFAULT_CANVAS_LENGTH //height
        this._settings = this.updateSettings(settings)   //ctx settings

        this._els={refs:[], def:[]}                      //arrs of objects to .draw() | refs: [{Object._arrName:Object}], def: [regular drawable objects]

        this._looping = false                            //loop state
        this._cb=loopingCallback                         //callback called along with the loop() fn

        this._deltaTime = null                           // useable delta time
    }


    startLoop() {
        if (!this._looping) {
            this._looping = true
            this.loop()
        }
    }

    loop(time) {
        this.calcDeltaTime(time)
        this.clear()
        this.draw()
        
        if (this._cb) this._cb() //custom callback

        if (this._looping) TIMEOUT_FN(this.loop.bind(this))
    }

    stopLoop() {
        this._looping = false
    }

    calcDeltaTime(time) {
        this._deltaTime = (time-this.#lastFrame)/1000
        this.#lastFrame = time
    }


    draw() {
        [...this._els.def, ...this._els.refs.flatMap(x=>{
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


    setSize(width, height) {
        if(width) this._cvs.width = width??window.innerWidth-20
        if(height) this._cvs.height = height??this._width/2
        this.updateSettings()
    }

    updateSettings(settings) {
        let st = settings||this._settings
        Object.entries(st).forEach(s=>this._ctx[s[0]]=s[1])
        return this._settings=st
    }

    add(objs, isRef) {
        let l = objs.length??1
        for (let i=0;i<l;i++) this._els[isRef?"refs":"def"].push(objs[i]??objs)
    }

    //remove(ids) {// i don't even know if this works idk
    //    this._els = this._els.filter(x=>!ids.includes(x))
    //}

    getObjs(instance) {
        return this._els.def.filter(x=>x instanceof instance)
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

	set cb(_cb) {return this._cb = _cb}
	set width(w) {this.setSize(w, null)}
	set height(h) {this.setSize(null, h)}
}