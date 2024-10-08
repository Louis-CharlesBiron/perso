class Obj {

    constructor(x, y, radius, color) {
        this._ctx
        this._id = idGiver++
        this._x = x
        this._y = y
        this._radius = radius??DEFAULT_RADIUS
        this._color = color??DEFAULT_COLOR
    }

    draw() {
        this._ctx.fillStyle = this._color

        this._ctx.beginPath()
        this._ctx.arc(this._x, this._y, this._radius, 0, CIRC)
        this._ctx.fill()

    }


    get x() {return this._x}
    get y() {return this._y}
    get radius() {return this._radius}
    get color() {return this._color}
    get id() {return this._id}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set radius(r) {this._r = r}
    set color(c) {this._c = c}
}