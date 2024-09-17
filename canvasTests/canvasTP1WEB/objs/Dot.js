class Dot {

    constructor(x, y, radius, rgba, limit) {
        this._ctx
        this._id = idGiver++
        this._x = x
        this._y = y
        this._radius = radius??DEFAULT_RADIUS
        this._rgba = rgba||DEFAULT_RGBA
        this._limit = limit??100
        this._ratio = 0
        this._drawEffectCB = null
    }

    draw() {
        this._ctx.fillStyle = formatColor(this._rgba)

        this._ctx.beginPath()
        this._ctx.arc(this._x, this._y, this._radius, 0, CIRC)
        this._ctx.fill()

        if (typeof this._drawEffectCB == "function") this._drawEffectCB(this._ctx, this)
    }

    getRatio(sPos) {
        return this._ratio = getDist(sPos[0], sPos[1], this._x, this._y) / this._limit
    }

    effect(effectCB, ratio=this._ratio) {
        effectCB(this, Math.min(1, ratio), ratio)
    }

    get x() {return this._x}
    get y() {return this._y}
    get radius() {return this._radius}
    get rgba() {return this._rgba}
    get id() {return this._id}
    get ratio() {return Math.min(1, this._ratio)}
    get rgba() {return this._rgba}
    get r() {return this._rgba[0]}
    get g() {return this._rgba[1]}
    get b() {return this._rgba[2]}
    get a() {return this._rgba[3]}
    get ratioRaw() {return this._ratio}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set limit(limit) {this._limit = limit}
    set radius(radius) {this._radius = radius}
    set r(r) {this._rgba[0] = r}
    set g(g) {this._rgba[1] = g}
    set b(b) {this._rgba[2] = b}
    set a(a) {this._rgba[3] = a}
    set rgba(rgba) {this._rgba = rgba}
    set drawEffectCB(d) {this._drawEffectCB = d}
}