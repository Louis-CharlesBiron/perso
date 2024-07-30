class Player {
    #lastFrameTime=0

    constructor(speed, size, x, y, controlsEl) {
        this.dx = -100
        this.dy = -100
        this.x = x??null
        this.y = y??null
        this.speed = speed
        this.size = size
        this.controlsEl = controlsEl||document.documentElement
        this.keybinds = {
            up:["w", "arrowup"],
            down:["s", "arrowdown"],
            right:["d", "arrowright"],
            left:["a", "arrowleft"],
            walk:["shift"],
            run:[" ", "control"]
        }
        this.activeKeys = {}
        
        this.setControls()
    }

    getMazePosition() {
        let mp = maze.postitions.flatMap(x=>x).filter(p=>this.dx>=p.dx&&this.dx<=p.dx+p.r*2 && this.dy>=p.dy&&this.dy<=p.dy+p.r*2)[0]
        this.x = mp.x
        this.y = mp.y
        return mp
    }

    draw(ctx, timestamp) {
        if (!this.#lastFrameTime) this.#lastFrameTime = timestamp//
        let d = (timestamp-this.#lastFrameTime)/1000, v = this.speed*d

        this.#lastFrameTime = timestamp

        this.actionControls(v)

        ctx.fillStyle = "#03d7ff"
        ctx.beginPath()
        ctx.rect(this.dx-this.size/2, this.dy-this.size/2, this.size, this.size)
        ctx.fill()
    }

    checkHitboxes(step, debug) {
        let hb = maze.getPositionHitboxes(this.getMazePosition()), r = this.size/2, 
        
        tl_x = this.dx-r|0, tl_y = this.dy-r|0,
        tr_x = this.dx+r|0, tr_y = this.dy-r|0,
        bl_x = this.dx-r|0, bl_y = this.dy+r|0,
        br_x = this.dx+r|0, br_y = this.dy+r|0
        
        //let h = hb[4]
        //console.log(h)
        //console.log(this.dx, this.dy, r)
        //console.log("TOP:", tl_y <= h[1][1] && (tl_x <= h[1][0] || tr_x >= h[0][0]))    // TOP
        //console.log("BOTTOM:", bl_y >= h[0][1] && (tl_x <= h[1][0] || tr_x >= h[0][0])) // BOTTOM
        //console.log("RIGHT:", tr_x >= h[0][0] && (tr_y <= h[1][1] || br_y >= h[0][1]))  // RIGHT
        //console.log("LEFT:", tl_x <= h[1][0] && (tr_y <= h[1][1] || br_y >= h[0][1]))   // LEFT

        return [
            !hb.some(h=>{
                //console.log(h)
                //console.log(tl_y, tl_x, tr_x)
                //console.log(tl_y <= h[1][1] && bl_y >= h[0][1] && ((tl_x >= h[0][0] && tl_x <= h[1][0]) || (tr_x <= h[1][0] && tr_x >= h[0][0]) || (tl_x <= h[0][0] && tr_x >= h[1][0])),                tl_y <= h[1][1], bl_y >= h[0][1], [(tl_x <= h[1][0] && tr_x >= h[1][0]), (tr_x >= h[0][0] && tl_x <= h[0][0])])
                return tl_y <= h[1][1] && this.dy >= h[0][1] && ((tl_x >= h[0][0] && tl_x <= h[1][0]) || (tr_x <= h[1][0] && tr_x >= h[0][0]) || (tl_x <= h[0][0] && tr_x >= h[1][0]))
            }), // TOP
            !hb.some(h=>{
                //console.log(h)
                //console.log(tr_x, tr_y, br_y)
                //console.log(tr_x >= h[0][0] && this.dx <= h[1][0] && ((tl_y >= h[0][1] && tl_y <= h[1][1]) || (tr_y <= h[1][1] && tr_y >= h[0][1]) || (tl_y <= h[0][1] && tr_y >= h[1][1])),        tr_x >= h[0][0], this.dx <= h[1][0], " | ", (tl_y >= h[0][1] && tl_y <= h[1][1]), (tr_y <= h[1][1] && tr_y >= h[0][1]), (tl_y <= h[0][1] && tr_y >= h[1][1]))
                //return tr_x >= h[0][0] && tr_x <= h[1][0] && (tr_y <= h[1][1] || br_y >= h[0][1])
                return tr_x >= h[0][0] && this.dx <= h[1][0] && ((tl_y >= h[0][1] && tl_y <= h[1][1]) || (tr_y <= h[1][1] && tr_y >= h[0][1]) || (tr_y <= h[0][1] && br_y >= h[1][1]))
            }), // RIGHT
            !hb.some(h=>bl_y >= h[0][1] && this.dy <= h[1][1] && ((tl_x >= h[0][0] && tl_x <= h[1][0]) || (tr_x <= h[1][0] && tr_x >= h[0][0]) || (tl_x <= h[0][0] && tr_x >= h[1][0]))), // BOTTOM
            !hb.some(h=>tl_x <= h[0][0] && this.dx >= h[1][0] && ((tl_y >= h[0][1] && tl_y <= h[1][1]) || (tr_y <= h[1][1] && tr_y >= h[0][1]) || (tr_y <= h[0][1] && br_y >= h[1][1])))  // LEFT
        ]

        //console.log(this.dy-r-step >= h[1][0], this.dy-r-step <= h[1][1], this.dy+r-step >= h[1][0], this.dy+r-step <= h[1][1], this.dx-r >= h[0][0], this.dx+r <= h[1][0])
        //hb.forEach(h=>{
        //    if (this.dy-r-step >= h[1][0] && this.dy-r-step <= h[1][1] && this.dx-r >= h[0][0] && this.dx+r >= h[1][0]) console.log("idk")
        //})

        // return hb.some(p=>{
        //     let dx = this.dx+this.size, dy = this.dy+this.size
        //     if (debug) {console.log(dx, dy, p)
        //         console.log("going right:", dx+step>=p[0][0], dx+step<=p[1][0], " -> ", (dx+step>=p[0][0] && dx+step<=p[1][0]))
        //         console.log("going left:", dx-step>=p[0][0], dx-step<=p[1][0], " -> ", (dx-step>=p[0][0] && dx-step<=p[1][0]))
        //         console.log("going top:", dy-step>=p[0][1], dy-step<=p[1][1], " -> ", (dy-step>=p[0][1] && dy-step<=p[1][1]))
        //         console.log("going bottom:", dy+step>=p[0][1], dy+step<=p[1][1], " -> ", (dy+step>=p[0][1] && dy+step<=p[1][1]))
        //         console.log("RES:", (dx+step>=p[0][0] && dx+step<=p[1][0])&& (dx-step>=p[0][0] && dx-step<=p[1][0])&& (dy-step>=p[0][1] && dy-step<=p[1][1])&& (dy+step>=p[0][1] && dy+step<=p[1][1]))
        //         console.log("")
        //     }
        //     return ((dx+step>=p[0][0] && dx+step<=p[1][0])//going right
        //     || (dx-step>=p[0][0] && dx-step<=p[1][0]))//going left
        //     &&
        //     ((dy-step>=p[0][1] && dy-step<=p[1][1])//going top
        //     || (dy+step>=p[0][1] && dy+step<=p[1][1]))//going bottom
        
            //(this.dx+step<p[0][0] && this.dx-step>p[1][0]) || (this.dy+step<p[0][1] && this.dy-step>p[1][1])
       // })
    }

    actionControls(v) {
        //check hitboxes
        //let hb = maze.getPositionHitboxes(this.getMazePosition())
        //console.log(hb)
        //if (hb[0]) console.log(this.dx, hb[0].w[0], " | ", this.dx, hb[0].w[0]+hb[0].r*2, "|", this.dy, hb[0].w[1], "|", this.dy, hb[0].w[1]+hb[0].r*2)
        //if (hb[0]   &&   this.dx < hb[0].w[0] && this.dx > hb[0].w[0]+hb[0].r*2   &&   this.dy < hb[0].w[1] && this.dy > hb[0].w[1]+hb[0].r*2) {
        //    console.log("STOP")
        //}

        if (this.activeKeys.run) v *= 1.75
        if (this.activeKeys.walk) v /= 2

        let next = [this.dy-v, this.dx+v, this.dy+v, this.dx-v], s = this.size/2, check = this.checkHitboxes(v)
        if (check[0] && this.activeKeys.up) this.dy = next[0] > maze.startY+s ? next[0] : maze.startY+s
        if (check[1] && this.activeKeys.right) this.dx = next[1] < maze.endX-s ? next[1] : maze.endX-s
        if (check[2] && this.activeKeys.down) this.dy = next[2] < maze.endY-s ? next[2] : maze.endY-s
        if (check[3] && this.activeKeys.left) this.dx = next[3] > maze.startX+s ? next[3] : maze.startX+s

        return Object.values(this.activeKeys).some(x=>x)
    }

    setControls() {
        this.controlsEl.onkeydown=this.controlsEl.onkeyup=e=>{
            Object.keys(this.keybinds).forEach(kb=>{
                if (this.keybinds[kb].includes(e.key.toLowerCase())) {
                    e.preventDefault()
                    this.activeKeys[kb]=(e.type == "keydown")
                }
            })
        }

        this.controlsEl.onblur=()=>{
            Object.keys(this.activeKeys).forEach(k=>this.activeKeys[k]=false)
        }
    }

    set position(pos) {
        let mp = maze.getPosition(pos)
        this.x = mp.x
        this.y = mp.y
        this.dx = mp.dx+mp.r
        this.dy = mp.dy+mp.r
    }

    
}