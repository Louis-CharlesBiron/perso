class Source {

    constructor(ctx, x, y, initDeg, maxReflects, radius, color) {
        this._ctx = ctx
        this._id = idGiver++
        this._x = x
        this._y = y
        this._r = radius??DEFAULT_RADIUS
        this._c = color??DEFAULT_COLOR

        this._initDeg = initDeg //360- 0→ 90↑ 180← 270↓

        this._reflects = []
        this._max = maxReflects
    }

    draw() {
        this._ctx.fillStyle = this._ctx.strokeStyle = this.color

        this._ctx.beginPath()
        this._ctx.arc(this._x, this._y, this._r, 0, CIRC)
        this._ctx.fill()

    }

    reflect() {
        
    }

getReflectPos(degrees) {
    let degDir = (degrees??this._initDeg)%360, deg = 360-degDir, dir = [!(degDir>=270||degDir<90)*2-1, (degDir>=0&&degDir<180)*2-1], a = Math.tan(toRad(deg)), b = -(a*this._x-this._y)
        console.log("DIR", degDir, dir)
    let v = obstacles.map(o=>{
        let [oa, ob, oFnY] = o.abfn, x, y

        if (!oa) x = (ob-this._y)/a + this._x // horizontal obs
        else if (!isFinite(oa)) y = a*(x=o.p1[0])+b
        else x = (((this._y-ob) - a*this._x)/oa) / (1 - a/oa) // inclined obs
        y ??= oFnY(x)
        let difX = this._x-x, difY = this._y-y, dif = Math.sqrt(difX**2+difY**2), ds = Math.sign(difX+difY)||1

        console.log(x, y, difX, difY, "DIF", difX+difY, " |OR :", Math.sqrt(difX**2 + difY**2), "cadX",Math.sign(difX)||ds, "cadY",Math.sign(difY)||ds, ds)
        return {x, y, cadX:Math.sign(difX)||ds, cadY:Math.sign(difY)||ds, dif:dif, o:o, degDir}
    }).filter(r=>
        r.o.isPartOf([r.x,r.y]) &&
        (dir[0] == r.cadX) && // single dir horizontal
        (dir[1] == r.cadY) && // single dir vertical
        r.x >= 0 && r.x <= cvs.width && // inside cavas width
        r.y >= 0 && r.y <= cvs.height   // inside cavas width
    ).toSorted((a,b)=>Math.abs(a.dif)-Math.abs(b.dif))
    console.log(v)
    return v[0]
}

    get x() {return this._x}
    get y() {return this._y}
    get radius() {return this._r}
    get color() {return this._c}
    get initDeg() {return this._initDeg}
    get maxReflects() {return this._max}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set color(c) {this._c = c}
    set initDeg(deg) {this._initDeg = deg}
    set maxReflects(max) {this._max = max}
}


