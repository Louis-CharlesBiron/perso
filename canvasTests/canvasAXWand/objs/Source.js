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
        let degDir = (degrees??this._initDeg)%360, deg = 360-degDir, dir = [!(degDir>=270||degDir<90)*2-1, Math.sign(180-degDir)||-1],
        a = Math.tan(toRad(deg)), b = -(a*this._x-this._y)
        
        return obstacles.map(o=>{
            let [oa, ob, oFnY] = o.abfn, x, y

            if (!oa) x = (ob-this._y)/a + this._x // horizontal obs
            else if (!isFinite(oa)) y = a*(x=o.p1[0])+b
            else x = (((this._y-ob) - a*this._x)/oa) / (1 - a/oa) // inclined obs

            return [x, y??oFnY(x), Math.sign(this._x-x)||-1, Math.sign(this._y-(y??oFnY(x)))]
        }).find(r=>
            dir[0] == r[2] && // single dir horizontal
            dir[1] == r[3] && // single dir vertical
            r[0] >= 0 && r[0] <= cvs.width && // inside cavas width
            r[1] >= 0 && r[1] <= cvs.height   // inside cavas width
        )
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


