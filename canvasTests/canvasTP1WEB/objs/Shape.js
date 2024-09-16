class Shape {

    constructor(name, dots, radius, rgba, limit, effectCB) {
        this._ctx
        this._id = idGiver++
        this._name = name
        this._radius = radius
        this._rgba = rgba
        this._limit = limit
        this._dots = []
        this._effectCB = effectCB // (dot, ratio, rawRatio)
        this.add(dots)
        //this.updateEffect(0)
    }

    add(dot) {
        this._dots.push(...[dot].flat().map(x=>{
            x.rgba = [...this._rgba]
            x.radius = this._radius
            x.limit = this._limit
            return x
        }))
    }

    updateEffect(sPos) {// sPos[] or ratio
        if (typeof this._effectCB == "function") this._dots.forEach(d=>d.effect(this._effectCB, typeof sPos=="object"?d.getRatio(sPos):sPos))
    }

    setRadius() {

    }

    setColor() {

    }

    setLimit() {

    }


    get id() {return this._id}
    get dots() {return this._dots}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set rgba(rgba) {this._rgba = rgba}
}