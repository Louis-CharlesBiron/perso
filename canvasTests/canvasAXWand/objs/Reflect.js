class Reflect {

    constructor(ctx, x, y, radius, color) {
        this._ctx = ctx
        this._id = idGiver++
        this._x = x
        this._y = y
        this._r = radius??DEFAULT_RADIUS
        this._c = color??DEFAULT_COLOR
    }

    draw() {
        this._ctx.fillStyle = this._ctx.strokeStyle = this.color

        this._ctx.beginPath()
        this._ctx.arc(this._x, this._y, this._r, 0, CIRC)
        this._ctx.fill()
    }
    


    get x() {return this._x}
    get y() {return this._y}
    get radius() {return this._r}
    get color() {return this._c}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set color(c) {this._c = c}
}