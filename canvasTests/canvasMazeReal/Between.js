class Between {
    #thresholds

    constructor(dx, dy, x, y, radius, mazePos) {
        this.type = "between"
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.r = radius
        this.mazePos = mazePos
        this.info = {
            drawCenter:[] //drawCenter: {color:"red", cr:5}
        }
    }

    set walls(walls) {
        if (!this.#thresholds) this.#thresholds = [this.mazePos?.[this.y-1]?.[this.x], this.mazePos?.[this.y]?.[this.x+1], this.mazePos?.[this.y+1]?.[this.x], this.mazePos?.[this.y]?.[this.x-1]]
        walls.forEach((w,i)=>{
            let t = this.#thresholds[i]
            if (t && w !== null) t.walls[(i+2)%4] = w
        }) 
    }

    get walls() {
        if (!this.#thresholds) this.#thresholds = [this.mazePos?.[this.y-1]?.[this.x], this.mazePos?.[this.y]?.[this.x+1], this.mazePos?.[this.y+1]?.[this.x], this.mazePos?.[this.y]?.[this.x-1]]
        return this.#thresholds.map((w, i)=>w?w.walls[(i+2)%4]:null)
    }

    draw(ctx) {
        ctx.lineWidth = 2

        // CENTER
        let dc = this.info.drawCenter
            if (dc.length) {
            dc.forEach(dci=>{
                ctx.fillStyle = dci.color||"red"

                ctx.beginPath()
                ctx.arc(this.dx+this.r, this.dy+this.r, dci.cr||5, 0, C) 
                ctx.fill()
        
                ctx.fillStyle = DEFAULT_COLOR
            })
        }
        
    }

    get cx() {
        return this.dx+this.r
    }

    get cy() {
        return this.dy+this.r
    }

    get cc() {
        return [this.cx, this.cy]
    }

    
}