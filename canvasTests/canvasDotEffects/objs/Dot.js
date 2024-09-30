// JS
// Canvas Dot Effects by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

class Dot {
    constructor(x, y, radius, rgba) {
        this._id = idGiver++
        this._initPos = [x, y]
        this._x = x
        this._y = y
        this._radius = radius??DEFAULT_RADIUS
        this._rgba = rgba||DEFAULT_RGBA
        this._parent = null
        this._anims = []
    }

    draw(ctx, time) {
        ctx.fillStyle = formatColor(this._rgba)

        ctx.beginPath()
        ctx.arc(this._x, this._y, this._radius, 0, CIRC)
        ctx.fill()

        if (typeof this.drawEffectCB == "function") {
            let dist = this.getDistance(), rawRatio = this.getRatio(dist)
            this.drawEffectCB(ctx, this, Math.min(1, rawRatio), this.cvs.mouse, dist, rawRatio)
        }

        if (this._anims[0]) this._anims[0].getFrame(time)
    }

    getDistance(fx,fy) {
        return getDist(fx??this.ratioPos[0], fy??this.ratioPos[1], this._x, this._y)
    }

    getRatio(dist) {
        return dist / this.limit
    }

    queueAnim(anim) {
        if (this.currentAnim) this.currentAnim.end()
        this._anims.push(anim)
        return anim
    }

    addForce(force, dir, time=1000, easing=Anim.easeInOutQuad) {
        let rDir = toRad(dir), ix = this._x, iy = this._y,
            dx = getAcceptableDif(force*Math.cos(rDir), ACCEPTABLE_DIF),
            dy = getAcceptableDif(force*Math.sin(rDir), ACCEPTABLE_DIF)
    
        return this.queueAnim(
            new Anim((prog)=>{
                this._x = ix+dx*prog
                this._y = iy-dy*prog
            }, time, easing, ()=>this._anims.shift())
        )
    }

    get id() {return this._id}
    get x() {return this._x}
    get y() {return this._y}
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
    get anims() {return this._anims}
    get currentAnim() {return this._anims[0]}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set limit(limit) {this._limit = limit}
    set radius(radius) {this._radius = radius}
    set r(r) {this._rgba[0] = r}
    set g(g) {this._rgba[1] = g}
    set b(b) {this._rgba[2] = b}
    set a(a) {this._rgba[3] = a}
    set rgba(rgba) {this._rgba = rgba}
    set parent(p) {this._parent = p}
}