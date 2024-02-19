class Color {
    
    constructor(c) {// [0, 0, 0]
        this._c = typeof c == "string" ? hexToRgb(c)??c.match(/[0-9]/g).map(x=>+x) : c


    }

    get c() {return this._c}
    get r() {return this._c[0]}
    get g() {return this._c[1]}
    get b() {return this._c[2]}

    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }

    getCtxPos(temperance) {
        let w = ctx.width,
            h = ctx.height,
            d = getImageData(0, 0, w, h).data,
            x, y = 0, p, px,
            r = this.r, g = this.g, b = this.b

            for (;y<h;y++) {
                p = y*4*w
                for (x=0;x<w;x++) {
                    px = p+x*4
                    
                    if (d[px] == r) if (d[px+1] == g && d[px+2] == b) return [x, y]
                        
                    
                }
            }
            
        return null
    }


}