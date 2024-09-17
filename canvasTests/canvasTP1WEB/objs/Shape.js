class Shape {

    constructor(name, dots, radius, rgba, limit, effectCB, drawEffectCB) {
        this._ctx
        this._id = idGiver++
        this._name = name
        this._radius = radius
        this._rgba = rgba
        this._limit = limit
        this._dots = []
        this._effectCB = effectCB // (dot, ratio, rawRatio)
        this._drawEffectCB = drawEffectCB // (
        if (dots?.length) this.add(dots)
        this.updateEffect(1)
    }

    add(dot) {
        this._dots.push(...[dot].flat().map(x=>{
            x.rgba = [...this._rgba]
            x.radius = this._radius
            x.limit = this._limit
            x.drawEffectCB = this._drawEffectCB
            return x
        }))
    }

    create(str, topLeftPos=[0,0], gaps=[25, 25], dotChar="o") {
        let endPoint = []
        str.split("\n").filter(x=>x).forEach((x,i)=>{
            let [atX, atY] = topLeftPos
            atY+=i*gaps[1];
            [...x].forEach(c=>{
                atX+=gaps[0]
                if (c==dotChar) this.add(new Dot(atX+gaps[0]/2, atY+gaps[1]/2))
            })
            endPoint.push([atX+gaps[0]/2, atY+gaps[1]/2])
        })
        return endPoint.last()
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