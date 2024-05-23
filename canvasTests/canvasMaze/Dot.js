const DEFAULT_COLOR = "aliceblue",
      DEFAULT_RADIUS = 6,
      CIRC = 2*Math.PI,
      DEFAULT_WW = 2,
      DEFAULT_WH = 44 
      TOTAL = DEFAULT_WH+DEFAULT_RADIUS


class Dot {

    constructor(x, y, walls) {// [0,0,0,0] | top right bottom left
        this._x = x
        this._y = y
        this._r = DEFAULT_RADIUS
        this._c = DEFAULT_COLOR
        this._w = walls??[]

        this.ww = [-DEFAULT_WW, -DEFAULT_WH-this._r, DEFAULT_WW, DEFAULT_WH+this._r]
    }

    get x() {return this._x}
    get y() {return this._y}
    get color() {return this._c}
    get walls() {return this._w}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set color(c) {this._c = c}
    set walls(w) {this._w = w}

    draw() {
        ctx.fillStyle = this._c
        ctx.beginPath()
        ctx.arc(this._x, this._y, this._r, 0, CIRC)
        ctx.fill();
        this._w.forEach((w, i)=>{
            if (+w) {
                ctx.beginPath()
                ctx.fillRect(this._x-(this.ww[i]/2), this._y-(this.ww[i+1]/2), this.ww[i], this.ww[(i+1)])
            }
        })
    }

    
}