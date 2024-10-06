// JS
// Canvas Dot Effects by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

class Shape {
    constructor(dots, radius, rgba, limit, drawEffectCB) {
        this._cvs
        this._id = idGiver++
        this._radius = radius??DEFAULT_RADIUS
        this._rgba = rgba||DEFAULT_RGBA
        this._limit = limit||100
        this._initDots = dots
        this._dots = []
        this._ratioPos = [Infinity,Infinity]
        this._drawEffectCB = drawEffectCB // (ctx, Dot, ratio)
    }

    initialize() {
        if (typeof this._initDots == "string") this.createFromString(this._initDots)
        else if (typeof this._initDots == "function") this._initDots(this, this._cvs)
        else if (this._initDots?.length) this.add(this._initDots)
    }

    add(dot) {
        this._dots.push(...[dot].flat().map(x=>{
            x.rgba = [...this._rgba]
            x.radius = this._radius
            x.parent = this
            return x
        }))
    }

    createFromString(str, topLeftPos=[0,0], gaps=[25, 25], dotChar="o") {//
        let dots = []
        str.split("\n").filter(x=>x).forEach((x,i)=>{
            let [atX, atY] = topLeftPos
            atY+=i*gaps[1];
            [...x].forEach(c=>{
                if (c==dotChar) dots.push(new Dot(atX+gaps[0]/2, atY+gaps[1]/2))
                atX+=gaps[0]
            })
        })
        return dots
    }

    setRadius(radius) {
        this._radius = radius
        this._dots.forEach(x=>x.radius=radius)
    }

    setRGBA(rgba) {
        this._rgba = rgba
        this._dots.forEach(x=>x.rgba=rgba)
    }

    setLimit(limit) {
        this._limit = limit
        this._dots.forEach(x=>x.limit=limit)
    }

    moveBy(x, y) {
        this._dots.forEach(d=>{
            if (x) d.x += x
            if (y) d.y += y
        })
    }

    scale(scale, dotRelative) {
        this._dots.forEach(d=>{
            if (dotRelative) {
                d.x = d.x * (scale[0]??scale)
                d.y = d.y * (scale[1]??scale)
            } else {
                d.x = d.initPos[0]*(scale[0]??scale)
                d.y = d.initPos[1]*(scale[1]??scale)
            }

        })
    }

    clear() {
        this._dots = []
    }

    reset() {
        this.clear()
        this.initialize()
    }

    asSource() {
        return {[Shape.childrenPath]:this}
    }

    static asSource(shape) {
        return {[Shape.childrenPath]:shape}
    }

    get cvs() {return this._cvs}
    get id() {return this._id}
    get dots() {return this._dots}
    get rgba() {return this._rgba}
    get radius() {return this._radius}
    get limit() {return this._limit}
	get initDots() {return this._initDots}
    get r() {return this._rgba[0]}
    get g() {return this._rgba[1]}
    get b() {return this._rgba[2]}
    get a() {return this._rgba[3]}
    get drawEffectCB() {return this._drawEffectCB}
    get ratioPos() {return this._ratioPos}
    static get childrenPath() {return "dots"}

    set cvs(cvs) {this._cvs = cvs}
    set ratioPos(ratioPos) {this._ratioPos = ratioPos}
    set drawEffectCB(cb) {this._drawEffectCB = cb}
}