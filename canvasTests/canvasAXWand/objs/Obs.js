class Obs {

    constructor(ctx, p1, p2, color) {
        this._ctx = ctx
        this._id = idGiver++
        this._p1 = p1
        this._p2 = p2
        this._c = color??DEFAULT_COLOR
        this._abfn = getLinearABFn([this._p1, this._p2])
    }

    draw() {
        this._ctx.fillStyle = this._ctx.strokeStyle = this.color

        this._ctx.beginPath()
        this._ctx.moveTo(this._p1[0], this._p1[1])
        this._ctx.lineTo(this._p2[0], this._p2[1])
        this._ctx.stroke()
    }
    
    isPartOf(p) {//mmm
        return (p[0]>=this._p1[0]||p[0]>=this._p2[0]) && (p[0]<=this._p2[0]||p[0]<=this._p1[0]) &&
               (p[1]>=this._p1[1]||p[1]>=this._p2[1]) && (p[1]<=this._p2[1]||p[1]<=this._p1[1])
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