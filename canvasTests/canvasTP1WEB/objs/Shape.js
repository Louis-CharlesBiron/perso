class Shape {

    constructor(name, x, y, dots, radius, color) {
        this._ctx
        this._id = idGiver++
        this._name = name
        this._x = x
        this._y = y
        this._radius = radius
        this._color = color
        this._dots = dots??[]
    }

    add(dot) {
        this._dots.push(...[dot].flat())
    }

    updateOpacity(sx, sy) {
        this._dots.forEach(d=>{
            d.setOpacity(d.getDistance(sx, sy))
        })
    }

    setRadius() {

    }

    setColor() {

    }


    get x() {return this._x}
    get y() {return this._y}
    get id() {return this._id}
    get dots() {return this._dots}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
}