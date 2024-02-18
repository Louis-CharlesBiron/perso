DEFAULT_POS = 10
DEFAULT_SPEED = 0.5
DEFAULT_WIDTH =  DEFAULT_HEIGHT = 10
DEFAULT_COLOR = "aliceblue"
DEFAULT_BGC = "black"
let lol = ["(↘)","(↗)","(↖)","(↙)"]

class Ball {
    
    constructor(x, y, width, height, color, speed) {
        this._x = x // x pos
        this._y = y // y pos
        this._w = width // width
        this._h = height // width
        this._c = color // color
        this._dir = -1// direction index
        this._s = speed // speed
        this._temps = speed // temp speed
        this._directions = [
            ()=>{this._x += this._s; this._y += this._s},// x++ y++ (→↓)
            ()=>{this._x += this._s; this._y -= this._s},// x++ y-- (→↑)
            ()=>{this._x -= this._s; this._y -= this._s},// x-- y-- (←↑)
            ()=>{this._x -= this._s; this._y += this._s} // x-- y++ (←↓)
            ]
        this._onCollision
        this._state = "initMoving"
    }

    get x() {return this._x}
    get y() {return this._y}
    get width() {return this._w}
    get height() {return this._h}
    get color() {return this._c}
    get dir() {return this._dir}
    get state() {return this._state}
    get speed() {return this._s}

    set x(x) {this._x = x}
    set y(y) {this._y = y}
    set width(w) {this._w = w}
    set height(h) {this._h = h}
    set color(c) {this._c = c}
    set speed(s) {this._s = s}
    set onCollision(callback) {this._onCollision = callback}

    appearence(w, h, c) {
        ctx.fillStyle = DEFAULT_BGC
        ctx.fillRect(this._x, this._y, this._w, this._h)
        this._w = w||DEFAULT_WIDTH
        this._h = h||DEFAULT_HEIGHT
        this._c = c??DEFAULT_COLOR
        this.draw()
    }
    
    draw() {
        ctx.fillStyle = this._c
        ctx.fillRect(this._x, this._y, this._w, this._h)
    }

    move() {
        if (this.getCollision().some(x=>x)) this.collision()
        this._directions[this._dir]?.()
    }

    stop() {
        this._temps = this._s
        this._s = 0
        this._state = "Paused"
    }

    resume() {
        this._s = this._temps
        this._state = "Moving"
    }

    reset() {
        this._x = this._y = DEFAULT_POS
        this._w = DEFAULT_WIDTH
        this._h = DEFAULT_HEIGHT
        this._c = DEFAULT_COLOR
        this._s = DEFAULT_SPEED
        this.stop()
        this.draw()
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, cvs.width, cvs.height)
    }

    setFunction(fd) {
        let col_i = fd??this.getCollision().indexOf(true),
            od = this._dir

        if (col_i == 0) {// left
            this._dir = od==3 ? 0 : 1
        } else if (col_i == 1) {// top
            this._dir = od==1 ? 0 : 3
        } else if (col_i == 2) {// right
            this._dir = od==0 ? 3 : 2
        } else if (col_i == 3) {// bottom
            this._dir = od==0 ? 1 : 2
        } else if (col_i == -1) this._dir = 0
        //console.log(this._dir)
    }

    getCollision() { // left:0, top:1, right:2, bottom:3
        return [this._x <= 0,this._y <= 0,this._x+this._w >= cvs.width,this._y+this._h >= cvs.height]
    }

    collision() {
        this.setFunction()
        this._onCollision?.()
    }

    toString() {
        return `${ball.state} ${lol[ball.dir]||""}  ${ball.speed*avgFps}px/sec`
    }





    // x++ y++ (→↓) 0
    // x++ y-- (→↑) 1
    // x-- y-- (←↑) 2
    // x-- y++ (←↓) 3

    /////////////////////////////////////////////
    //                   /\                    //
    //                                         //
    //                                         //
    //                                         //
    // <                                     > //
    //                                         //
    //                                         //
    //                                         //
    //                   \/                    //
    /////////////////////////////////////////////



}