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

        let next = [this.dy-v, this.dx+v, this.dy+v, this.dx-v], s = this.size/2// up right down left
        if (this.activeKeys.up) this.dy = next[0] > maze.startY+s ? next[0] : maze.startY+s
        if (this.activeKeys.right) this.dx = next[1] < maze.endX-s ? next[1] : maze.endX-s
        if (this.activeKeys.down) this.dy = next[2] < maze.endY-s ? next[2] : maze.endY-s
        if (this.activeKeys.left) this.dx = next[3] > maze.startX+s ? next[3] : maze.startX+s

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