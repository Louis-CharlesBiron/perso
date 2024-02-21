const DEFAULT_TEMPERANCE = 0,
      DEFAULT_RADIUS = 5
      CIRC = 2*Math.PI

class Color {
    
    constructor(c, originCtx, destinationCtx) {// [0, 0, 0]
        this._c = typeof c == "string" ? hexToRgb(c)??c.match(/[0-9]/g).map(x=>+x) : c
        this._ctxO = originCtx??ctx
        this._ctxD = destinationCtx??ctx2
    }

    get c() {return this._c}
    get r() {return this._c[0]}
    get g() {return this._c[1]}
    get b() {return this._c[2]}

    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }

    getPos(t=0) {//temperance
        let w = this._ctxO.canvas.width, h = this._ctxO.canvas.height,
            d = this._ctxO.getImageData(0, 0, w, h).data,
            x, y, p, px,
            br = this.r-t, bg = this.g-t, bb = this.b-t,
            tr = this.r+t, tg = this.g+t, tb = this.b+t,
            v = null, v2 = null

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
                //bottom-right
                if (v) for (x=v[0];x<w;x++) {
                    px = p+x*4
                    if ((d[px] <= br || d[px] >= tr) && (d[px+1] <= bg || d[px+1] >= tg) && (d[px] <= bb || d[px] >= tb)) {
                        v2 = [x, y]
                        break;
                    }
                    y++
                }
                if (v2) break;
            }
        
        return v&&v2 ? {tl:{x:v[0], y:v[1]}, br:{x:v2[0], y:v2[1]},c:{x:(v[0]+(v2[0]-v[0])/2)>>0, y:(v[1]+(v2[1]-v[1])/2)>>0}} : null
    }

    draw(t) {
        let pos = this.getPos(t??DEFAULT_TEMPERANCE)
        if (pos) {console.log("draw")
            this._ctxD.fillStyle = this.toString()
            this._ctxD.beginPath()
            this._ctxD.arc(pos.c.x, pos.c.y, DEFAULT_RADIUS, 0, CIRC)
            this._ctxD.fill()
        }
    }




}