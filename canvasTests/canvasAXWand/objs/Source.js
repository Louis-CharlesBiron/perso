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

    reflect(max=this._max, reset) {
        if (reset) this._reflects = []
        for (let i=0;i<max;i++) {
            let lastRef = this._reflects.last(), rInfo = this.getReflectPos(lastRef?.getOutDeg()??this._initDeg, lastRef?.x??this._x, lastRef?.y??this._y) 
            if (rInfo) {
                let reflect = new Reflect(cvs.ctx, rInfo.x, rInfo.y, lastRef?.getPos()??this.getPos(), rInfo.degDir, rInfo.obsDir, 3, "red")
                this._reflects.push(reflect)
                cvs.els.push(reflect)
            } else {
                console.log("No obstacle found", lastRef?.getOutDeg()??this._initDeg, lastRef?.x??this._x, lastRef?.y??this._y)
            }

            //console.log(lastRef, reflect)
        }
    }

    getReflectPos(degrees=this._initDeg, atX=this._x, atY=this._y) {
        let degDir = degrees%360, deg = 360-degDir, dir = [!(degDir>270||degDir<90)*2-1, (degDir>=0&&degDir<180)*2-1], a = Math.tan(toRad(deg)), b = -(a*atX-atY)
            //console.log("DIR", degDir, dir)
        let v = obstacles.map(o=>{
            let [oa, ob, oFnY] = o.abfn, x, y

            if (!oa) x = (ob-atY)/a + atX // horizontal obs
            else if (!isFinite(oa)) y = a*(x=o.p1[0])+b // vertical obs
            else x = (((atY-ob) - a*atX)/oa) / (1 - a/oa) // inclined obs
            y ??= oFnY(x)
            let difX = getAcceptableDif(atX-x, ACCEPTABLEDIF), difY = getAcceptableDif(atY-y, ACCEPTABLEDIF), cadX = Math.sign(difX), cadY = Math.sign(difY), dif = Math.sqrt(difX**2+difY**2),
            isValid = o.isPartOf([x,y]) && // is part of line 
            (dir[0]==cadX || (!cadX && !(degDir%90))) && // single dir horizontal
            (dir[1]==cadY || (!cadY && !(degDir%90))) && // single dir vertical
            x >= 0 && x <= cvs.width && // inside cavas width
            y >= 0 && y <= cvs.height &&   // inside cavas height
            dif >= 1 // prevent transpersion (maybe instead of ruling out, place at end of array)

            //console.log(x, y, difX, difY, "DIF", difX+difY, " |OR :", Math.sqrt(difX**2 + difY**2), "cadX",Math.sign(difX), "cadY",Math.sign(difY))
            return isValid&&{x, y, dif, degDir, obsDir:o.getOrientation()}
        }).filter(r=>r).toSorted((a,b)=>Math.abs(a.dif)-Math.abs(b.dif))[0]
        console.log(v)
        return v
    }

    getPos() {
        return [this._x, this._y]
    }

    sweep(start=0, end=360, reflectNum=2, delay=10) {
        for (let i=start,at=0;i<=end;i++) {
            setTimeout(()=>{
                source.initDeg = i
                source.reflect(reflectNum, true)
            },at+=delay)
        }
    }

    cadrans() {
        for (let i=0;i<=360;i+=90) {
            source.initDeg = i
            source.reflect(2, true)
        }
    }

    get x() {return this._x}
    get y() {return this._y}
    get radius() {return this._r}
    get color() {return this._c}
    get initDeg() {return this._initDeg}
    get maxReflects() {return this._max}
    get reflects() {return this._reflects}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set color(c) {this._c = c}
    set initDeg(deg) {this._initDeg = deg}
    set maxReflects(max) {this._max = max}
}