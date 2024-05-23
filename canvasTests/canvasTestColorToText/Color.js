const DEFAULT_TEMPERANCE = 0,
      DEFAULT_RADIUS = 4
      CIRC = 2*Math.PI

class Color {
    
    constructor(c, originCtx, destinationCtx) {// [0, 0, 0]
        this._c = typeof c == "string" ? hexToRgb(c)??c.match(/[0-9]/g).map(x=>+x) : c
        this._ctxO = originCtx??ctx
        this._ctxD = destinationCtx??ctx2
        this._x
        this._y
    }

    get c() {return this._c}
    get r() {return this._c[0]}
    get g() {return this._c[1]}
    get b() {return this._c[2]}
    get x() {return this._x}
    get y() {return this._y}

    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }

    getPos(t=0) {//temperance
        let w = this._ctxO.canvas.width, h = this._ctxO.canvas.height,
            d = this._ctxO.getImageData(0, 0, w, h).data,
            x, y, p, px,
            br = this.r-t, bg = this.g-t, bb = this.b-t,
            tr = this.r+t, tg = this.g+t, tb = this.b+t,
            v = null

            //top-left
            for (y=0;y<h;y++) {
                p = y*4*w
                for (x=0;x<w;x++) {
                    px = p+x*4
                    if (d[px] >= br && d[px] <= tr) if (d[px+1] >= bg && d[px+1] <= tg && d[px+2] >= bb && d[px+2] <= tb) {
                        v = [x, y]
                        break;
                    }
                }
                if (v) break;
            }
        
        return v ? {x:v[0], y:v[1]} : null
    }

    draw(t) {
        let pos = this.getPos(t??DEFAULT_TEMPERANCE),
        x = this._x = (pos?.x)??this._x,
        y = this._y = (pos?.y)??this._y
        
        
        if (pos) console.log("%cd",`color: ${this.toString()};`)

        this._ctxD.fillStyle = red.toString()
        this._ctxD.beginPath()
        this._ctxD.arc(x, y, DEFAULT_RADIUS, 0, CIRC)
        this._ctxD.fill()
    }




}