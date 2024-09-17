class Dot {

    constructor(x, y, radius, rgba, limit) {
        this._ctx
        this._id = idGiver++
        this._x = x
        this._y = y
        this._radius = radius??DEFAULT_RADIUS
        this._rgba = rgba||DEFAULT_RGBA
        this._limit = limit??100
    }

    draw() {
        this._ctx.fillStyle = this.formatColor(this._rgba)

        this._ctx.beginPath()
        this._ctx.arc(this._x, this._y, this._radius, 0, CIRC)
        this._ctx.fill()

        if (typeof cb == "function") cb(this._ctx)
    }

    getRatio(sPos) {
        return getDist(sPos[0], sPos[1], this._x, this._y) / this._limit
    }

    effect(effectCB, ratio) {
        effectCB(this, ratio>1?1:ratio, ratio)
    }

    formatColor() {
        return `rgba(${this._rgba[0]}, ${this._rgba[1]}, ${this._rgba[2]}, ${this._rgba[3]})`
    }



    get x() {return this._x}
    get y() {return this._y}
    get radius() {return this._radius}
    get rgba() {return this._rgba}
    get id() {return this._id}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set limit(limit) {this._limit = limit}
    set radius(radius) {this._radius = radius}
    set r(r) {this._rgba[0] = r}
    set g(g) {this._rgba[1] = g}
    set b(b) {this._rgba[2] = b}
    set a(a) {this._rgba[3] = a}
    set rgba(rgba) {this._rgba = rgba}
}