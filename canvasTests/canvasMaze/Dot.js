const DEFAULT_COLOR = "aliceblue",
      DEFAULT_RADIUS = 5,
      CIRC = 2*Math.PI
      W_WIDTH = 10
      W_LENGTH = 100

class Dot {

    constructor(x, y, walls) {// [0,0,0,0] | top right bottom left
        this._x = x
        this._y = y
        this._r = DEFAULT_RADIUS
        this._c = DEFAULT_COLOR
        this._w = walls??[]
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
            ctx.beginPath()
            if (+w) ctx.fillRect(this._x, this._y, i%2?W_WIDTH:W_LENGTH, i%2?W_LENGTH:W_WIDTH)

        })
    }

    
}