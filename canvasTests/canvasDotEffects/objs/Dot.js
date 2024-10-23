// JS
// Canvas Dot Effects by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

class Dot {
    constructor(pos, radius, rgba, setupCB) {
        this._id = idGiver++
        this._initPos = pos||[0,0]
        this._pos = this._initPos
        this._radius = radius??DEFAULT_RADIUS
        this._rgba = rgba||DEFAULT_RGBA
        this._parent = null
        this._anims = []
        this._connections = []    
        this._setupCB = setupCB    
    }

    initialize() {
        if (this.id == 13)console.log("SETUP CALLED 1")
        if (typeof this._pos == "function") this._pos = this._initPos(this, this._parent)
        if (typeof this._setupCB == "function") this._setupCB(this, this._parent)
    }

    draw(ctx, time) {
        ctx.fillStyle = formatColor(this._rgba)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this._radius, 0, CIRC)
        ctx.fill()

        if (typeof this.drawEffectCB == "function") {
            let dist = this.getDistance(), rawRatio = this.getRatio(dist)
            this.drawEffectCB(ctx, this, Math.min(1, rawRatio), this.cvs.mouse, dist, rawRatio)
        }

        if (this.id==test2.dots.last().id && time<1000) console.log("GETFRAME CALLED", this._anims[0], time)

        if (this._anims[0]) this._anims[0].getFrame(time)
    }

    getDistance(fx,fy) {
        return getDist(fx??this.ratioPos[0], fy??this.ratioPos[1], this.x, this.y)
    }

    getRatio(dist) {
        return dist / this.limit
    }

    queueAnim(anim, force) {
        if (this.currentAnim && force) this.currentAnim.end()
        if (!anim.endCallback) anim.endCallback=()=>{this._anims.shift()}
        this._anims.push(anim)
        return anim
    }

    addConnection(dot) {
        if (typeof dot == "object") this._connections.push(dot)
    }

    removeConnection(dotId) {
        this._connections = this._connections.filter(d=>typeof dotId=="number"?d.id!==dotId:d.id!==dotId.id)
    }

    addForce(force, dir, time=1000, easing=Anim.easeInOutQuad) {
        let rDir = toRad(dir), ix = this.x, iy = this.y,
            dx = getAcceptableDif(force*Math.cos(rDir), ACCEPTABLE_DIF),
            dy = getAcceptableDif(force*Math.sin(rDir), ACCEPTABLE_DIF)
    
        return this.queueAnim(new Anim((prog)=>{
            this.x = ix+dx*prog
            this.y = iy-dy*prog
        }, time, easing, ()=>this._anims.shift()), true)
    }

    follow(duration, easing, action,  ...progressSeparations) {
        let [ix, iy] = this._pos, c1=0,c2=0
        console.log("FOLLOW CALL INSIDE")
        
        //let d = test2.dots.last(), w = 400, h = 50, freq = 4
        //d.queueAnim(new Anim((prog)=>{
        //    if (prog > 0.5) {
        //        d.x = ix + (w-w*prog)
        //        d.y = iy + (Math.sin((d.x-ix)*(Math.PI/(w/freq))+Math.PI)*h)
        //    } else {
        //        d.x = ix + (w * prog)
        //        d.y = iy + (Math.sin((d.x-ix)*(Math.PI/(w/freq)))*h)
        //    }
        //    console.log(d.x, d.y, getDist(d.x, d.y, ix, iy))
        //    CVS.add(new Dot([d.x, d.y], 2, [255,0,0,1]),true)
        //}, 1000, (x)=>x))

        this.queueAnim(new Anim((prog)=>{
            console.log("ANIM FRAME:", c1++, prog, progressSeparations.reduce((a,b)=>Object.keys(b)[0]>prog?a:b,0))
            let [nx, ny] = Object.values(progressSeparations.reduce((a,b)=>Object.keys(b)[0]>prog?a:b,0))[0](prog, this, ix, iy)
            this.x = nx//ix+nx
            this.y = ny//iy+ny
            if (typeof action == "function") action(prog, this)
        }, duration, easing))

    }

    remove() {
        this._parent.remove(this._id)
    }

    get id() {return this._id}
    get x() {return this._pos[0]}
    get y() {return this._pos[1]}
    get pos() {return this._pos}
    get pos_() {return [...this._pos]}
    get radius() {return this._radius}
	get initPos() {return this._initPos}
    get rgba() {return this._rgba}
    get r() {return this._rgba[0]}
    get g() {return this._rgba[1]}
    get b() {return this._rgba[2]}
    get a() {return this._rgba[3]}
    get parent() {return this._parent}
    get drawEffectCB() {return this._parent?.drawEffectCB}
    get limit() {return this._parent?.limit}
    get ratioPos() {return this._parent?.ratioPos}
    get cvs() {return this._parent?.cvs}
    get ctx() {return this._parent?.cvs.ctx}
    get anims() {return this._anims}
    get currentAnim() {return this._anims[0]}
    get connections() {return this._connections}

    set x(x) {this._pos[0] = x}
    set y(y) {this._pos[1] = y}
    set limit(limit) {this._limit = limit}
    set radius(radius) {this._radius = radius}
    set r(r) {this._rgba[0] = r}
    set g(g) {this._rgba[1] = g}
    set b(b) {this._rgba[2] = b}
    set a(a) {this._rgba[3] = a}
    set rgba(rgba) {this._rgba = rgba}
    set parent(p) {this._parent = p}
    set connections(c) {return this._connections = c}
}