class Dot {

    constructor(x, y, radius, color) {
        this._ctx
        this._id = idGiver++
        this._x = x
        this._y = y
        this._radius = radius??DEFAULT_RADIUS
        this._c = [255, 255, 255, 1]//
        this._limit = 100 //radius limit transparency
    }

    draw() {
        this._ctx.fillStyle = this.formatColor(this._c)

        this._ctx.beginPath()
        this._ctx.arc(this._x, this._y, this._radius, 0, CIRC)
        this._ctx.fill()
    }

    getDistance(ox, oy) {
        return getDist(ox, oy, this._x, this._y)
    }

    setOpacity(distance) {
        this._c[3] = 1 - (distance / this._limit)
    }

    formatColor() {
        return `rgba(${this._c[0]}, ${this._c[1]}, ${this._c[2]}, ${this._c[3]})`
    }



    get x() {return this._x}
    get y() {return this._y}
    get radius() {return this._radius}
    get color() {return this._c}
    get id() {return this._id}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set radius(r) {this._radius = r}
    set color(c) {this._c = c}
}