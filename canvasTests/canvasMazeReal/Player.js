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

    checkHitboxes(nexts=[this.dy, this.dx, this.dy, this.dx], v) {
        let hb = maze.getPositionHitboxes(this.getMazePosition()), lw = ctx.lineWidth, r = this.size/2 + lw,
        xl = nexts[3]-r, xr = nexts[1]+r,
        yt = nexts[0]-r, yb = nexts[2]+r

        return [
            hb?.[hb.findIndex(h=>yt < h[1][1] && yt-v > h[0][1] && ((xl > h[0][0]+v && xl < h[1][0]-v) || (xr < h[1][0]-v && xr > h[0][0]+v) || (xl < h[0][0]-v && xr > h[1][0]+v)))]?.[1][1]+r, // TOP
            hb?.[hb.findIndex(h=>xr > h[0][0] && xr-v < h[1][0] && ((yt > h[0][1]+v && yt < h[1][1]-v) || (yt < h[1][1]-v && yt > h[0][1]+v) || (yt < h[0][1]-v && yb > h[1][1]+v)))]?.[0][0]-r, // RIGHT
            hb?.[hb.findIndex(h=>yb > h[0][1] && yb-v < h[1][1] && ((xl > h[0][0]+v && xl < h[1][0]-v) || (xr < h[1][0]-v && xr > h[0][0]+v) || (xl < h[0][0]-v && xr > h[1][0]+v)))]?.[0][1]-r,//-lw, // BOTTOM
            hb?.[hb.findIndex(h=>xl < h[1][0] && xr+v > h[0][0] && ((yt > h[0][1]+v && yt < h[1][1]-v) || (yt < h[1][1]-v && yt > h[0][1]+v) || (yt < h[0][1]-v && yb > h[1][1]+v)))]?.[1][0]+r//-lw*2  // LEFT
        ]
    }

    actionControls(v) {

        if (this.activeKeys.run) v *= 1.75
        if (this.activeKeys.walk) v /= 2

        let next = [this.dy-v, this.dx+v, this.dy+v, this.dx-v], s = this.size/2, check = this.checkHitboxes(next, v)
        if (check.some(x=>x)) console.log(check)
        if (this.activeKeys.up)    this.dy = next[0]>maze.startY+s ? check[0]||next[0] : maze.startY+s
        if (this.activeKeys.right) this.dx = next[1]<maze.endX-s   ? check[1]||next[1] : maze.endX-s
        if (this.activeKeys.down)  this.dy = next[2]<maze.endY-s   ? check[2]||next[2] : maze.endY-s
        if (this.activeKeys.left)  this.dx = next[3]>maze.startX+s ? check[3]||next[3] : maze.startX+s
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

        this.controlsEl.onblur=this.controlsEl.oncontextmenu=()=>{
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