class Reflect {

    constructor(x, y, srcPos, inDeg, atDeg, radius, color) {
        this._ctx = null
        this._id = idGiver++
        this._src = srcPos
        this._inDeg = inDeg
        this._atDeg = atDeg
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
        this._ctx.lineTo(this._src[0], this._src[1])
        this._ctx.stroke()
    }

    getOutDeg(inDeg=this._inDeg, atDeg=this._atDeg) {
        let defOut = inDeg<180 ? 180-inDeg : 540-inDeg, outDeg = defOut
    
        if (atDeg==180) outDeg = 360-inDeg
        else outDeg = defOut-((90-atDeg)*2)

        return outDeg
    }
    
    getPos() {
        return [this._x, this._y]
    }

    get x() {return this._x}
    get y() {return this._y}
    get srcPos() {return this._src}
    get inDeg() {return this._inDeg}
    get atDeg() {return this._atDeg}
    get radius() {return this._r}
    get color() {return this._c}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set color(c) {this._c = c}
}