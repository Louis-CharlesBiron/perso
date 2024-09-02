class Reflect {

    constructor(ctx, source, x, y, radius, color) {
        this._ctx = ctx
        this._id = idGiver++
        this._src = source
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

        this._ctx.beginPath()
        this._ctx.moveTo(this._x, this._y)
        this._ctx.lineTo(this._src.x, this._src.y)
        this._ctx.stroke()
    }
    


    get x() {return this._x}
    get y() {return this._y}
    get radius() {return this._r}
    get color() {return this._c}
    get source() {return this._c}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set color(c) {this._c = c}
}