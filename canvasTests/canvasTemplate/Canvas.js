const DEFAULT_CANVAS_LENGTH = 500, DEFAULT_CTX_SETTINGS = {"imageSmoothingEnabled":false, "lineWidth":3, "fillStyle":"aliceblue", "stokeStyle":"aliceblue"}, TIMEOUT_FN = window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame

class Canvas {

    constructor(cvs, settings, width, height, loopingCallback) {
        this._cvs = cvs                                  //html canvas el
        this._ctx = this._cvs.getContext("2d", {})       //ctx
        this._cvs.width = width||DEFAULT_CANVAS_LENGTH   //width
        this._cvs.height = height||DEFAULT_CANVAS_LENGTH //height
        this._settings = this.updateSettings(settings)   //ctx settings

        this.els=[]                                      //direct arr of objects to .draw()

        this._looping = false                            //loop state
        this._cb=loopingCallback                         //callback called along with the loop() fn

        this._lastFrame = 0                              // for delta time
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
        
        this._cb?.() //custom callback

        if (this._looping) TIMEOUT_FN(this.loop.bind(this))
    }

    stopLoop() {
        this._looping = false
    }

    calcDeltaTime(time) {
        this._deltaTime = (time-this._lastFrame)/1000
        this._lastFrame = time
    }


    draw() {
        this.els.forEach(el=>el?.draw())
    }

    clear(x=0, y=0, width, height) {
        this._ctx.clearRect(x??0, y??0, width??this._cvs.width, height??this._cvs.height)
    }


    setSize(width, height) {
        this._cvs.width = width??window.innerWidth-20
        this._cvs.height = height??this._width/2
    }

    updateSettings(settings) {
        let st = settings||this._settings
        Object.entries(st).forEach(s=>this._ctx[s[0]]=s[1])
        return this._settings=st
    }

    
	get cvs() {return this._cvs}
	get ctx() {return this._ctx}
	get width() {return this._cvs.width}
	get height() {return this._cvs.height}
	get settings() {return this._settings}
	get cb() {return this._cb}
	get looping() {return this._looping}
	get deltaTime() {return this._deltaTime}

	set cb(_cb) {return this._cb = _cb}
}