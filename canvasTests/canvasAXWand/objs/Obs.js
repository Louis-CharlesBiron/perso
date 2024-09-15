let OBS_DEFAULT_COLOR = "aliceblue"

class Obs {

    constructor(p1, p2, color) {
        this._ctx = null
        this._id = idGiver++
        this._p1 = p1
        this._p2 = p2
        this._c = color??OBS_DEFAULT_COLOR
        this._abfn = getLinearABFn([this._p1, this._p2])
    }

    draw() {
        this._ctx.fillStyle = this._ctx.strokeStyle = this.color

        this._ctx.beginPath()
        this._ctx.moveTo(this._p1[0], this._p1[1])
        this._ctx.lineTo(this._p2[0], this._p2[1])
        this._ctx.stroke()
    }
    
    isPartOf(p) {//mmmh ok ig
        return (p[0]>=this._p1[0]||p[0]>=this._p2[0]) && (p[0]<=this._p2[0]||p[0]<=this._p1[0]) &&
               (p[1]>=this._p1[1]||p[1]>=this._p2[1]) && (p[1]<=this._p2[1]||p[1]<=this._p1[1])
    }

    getDim() {
        let dx = this._p1[0]-this._p2[0], dy = this._p1[1]-this._p2[1]
        return {dx, dy, hyp:Math.sqrt(dx**2+dy**2)}
    }

    getOrientation(invert) {
        let {dx, hyp} = this.getDim()
        return toDeg(Math.acos(dx/hyp))
    }

    get p1() {return this._p1}
    get p2() {return this._p2}
    get color() {return this._c}
    get abfn() {return this._abfn}

    set p1(p1) {
        this._p1 = p1
        this._abfn = getLinearABFn([this._p1, this._p2])
    }
    set p2(p2) {
        this._p2 = p2
        this._abfn = getLinearABFn([this._p1, this._p2])
    }
    set color(c) {this._c = c}
}