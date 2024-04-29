const CIRC = 2*Math.PI
const MOUSE_CCOLOR = "rgb(178 161 255)"
const COLOR_VARIATION = 75

class Dot {

    constructor(x, y, radius, color, range, showRange, speed) {
        this._x = x
        this._y = y
        this._r = radius??DEFAULT_RADIUS
        this._c = color??DEFAULT_COLOR
        this._range = range??DEFAULT_RANGE
        this._targets = []
        this._showRange = showRange??DEFAULT_RANGE
        this._speed = speed??DEFAULT_SPEED
    }

    get x() {return this._x}
    get y() {return this._y}
    get speed() {return this._speed}
    get color() {return this._c.replaceAll(/[0-9]+/g, (x)=>+x+random(-75, 75))}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set range(r) {this._range = r}
    set showRange(s) {this._showRange = s}
    set speed(s) {this._speed = s}
    set color(c) {this._c = c}

    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this._x, this._y, this._r, 0, CIRC)
        ctx.fill()

        if (this._showRange == "all" || (this._showRange == "active" && mouse && this.getDistance(mouse) <= this._range)) {
            ctx.strokeStyle = this.color
            ctx.beginPath()
            ctx.arc(this._x, this._y, this._range, 0, CIRC)
            ctx.stroke()
        }
    }

    drawConnections() {
        this.getTargets().forEach((t)=>{
            if (t.mouse) ctx.strokeStyle = MOUSE_CCOLOR
            else ctx.strokeStyle = this.color.replaceAll(/[0-9]+/g, (x)=>+x+random(-50, 50))
            ctx.beginPath()
            ctx.moveTo(this._x, this._y)
            ctx.lineTo(t.x, t.y)
            ctx.stroke()
        })
    }

    toggleShowRange(state) {
        return this._showRange = state
    }

    getTargets() {
        let targets = []
        //mouse
        let md = this.getDistance(mouse)
        if (md !== -1 && md <= this._range) targets.push(mouse)
        
        //other dots
        dots.forEach((d)=>{
            let dd =this.getDistance(d)
            if (dd > 0 && dd <= this._range) targets.push(d)
        })
        
        return this._targets = targets
    }

    getDistance(target) {
        return target ? Math.sqrt(Math.pow(target.x-this._x, 2) + Math.pow(target.y-this._y, 2)) : -1
    }

    move() {
        if (this._speed > 0) {
            this._x += random(-this._speed, this._speed)
            this._y += random(-this._speed, this._speed)
        }
    }



    
    
}