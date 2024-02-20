class Color {
    
    constructor(c, context) {// [0, 0, 0]
        this._c = typeof c == "string" ? hexToRgb(c)??c.match(/[0-9]/g).map(x=>+x) : c
        this._ctx = context??ctx

    }

    get c() {return this._c}
    get r() {return this._c[0]}
    get g() {return this._c[1]}
    get b() {return this._c[2]}

    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }

    getPos(t=0) {//temperance
        let w = this._ctx.canvas.width,
            h = this._ctx.canvas.height,
            d = this._ctx.getImageData(0, 0, w, h).data,
            x, y = 0, p, px,
            br = this.r-t, bg = this.g-t, bb = this.b-t,
            tr = this.r+t, tg = this.g+t, tb = this.b+t,
            v = null, v2 = null

            //top-left
            for (;y<h;y++) {
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
                    if (d[px] < br || d[px] > tr) {
                        v2 = [x, y]
                        break;
                    }
                    y++
                }
                if (v2) break;
            }

            
        return [v, v2]
    }


}