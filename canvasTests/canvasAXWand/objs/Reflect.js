class Reflect {

    constructor(ctx, x, y, srcPos, inDeg, atDeg, radius, color) {
        this._ctx = ctx
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
        let outDeg=null
        // deg<180 -> (180-deg)+
        // relection orientation: (DONE: vertical obs, horizontal obs, ||||| TODO: cadran angles, oblique obs)
        // deg>180 -> 360-(inDeg-180)
        // deg == 0 
        // deg == 90 
        // deg == 180 
        // deg == 270 
        if (inDeg<180) {
            let defOut = 180-inDeg
            if (atDeg==90) {
                outDeg = defOut
            } else if (atDeg==180) {
                outDeg = 360-inDeg
            } else if (atDeg<90) {
                outDeg = defOut-atDeg
            } else if (atDeg>90) {
                outDeg = defOut+atDeg-90
            } else console.log("WTF ----")
            //console.log(inDeg, atDeg, "->",outDeg," | ",defOut)

        } else {// inDeg>180
            let defOut = 540-inDeg
            if (atDeg==90) {
                outDeg = defOut
            } else if (atDeg==180) {
                outDeg = 360-inDeg
            } else if (atDeg<90) {
                outDeg = defOut+atDeg
            } else if (atDeg>90) {
                outDeg = defOut+atDeg-90
            } else console.log("WTF ----")
            console.log(inDeg, atDeg, "->",outDeg," | ",defOut)
        }
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