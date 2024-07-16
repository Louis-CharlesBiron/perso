const DEFAULT_COLOR = "aliceblue", C = 2*Math.PI

class Threshold {
    #DEFAULT_RADIUS = 25

    constructor(dx, dy, x, y, radius, walls) {// [0,0,0,0] | top right bottom left
        this.type = "threshold"
        this.dx = dx
        this.dy = dy
        this.x = x
        this.y = y
        this.r = radius || this.#DEFAULT_RADIUS
        this.c = DEFAULT_COLOR
        this.walls = walls || []
        this.info = {
            drawCenter:[] //drawCenter: {color:"red", cr:5}
        } 
    }


    draw(ctx) {
        let d = this.r*2, dx = this.dx, dy = this.dy
        ctx.fillStyle = ctx.strokeStyle = this.c;ctx.lineWidth = 2

        // WALLS
        this.walls.forEach((w, i)=>{
            if (w) {
                ctx.beginPath()
                if (i == 0) {//top
                    ctx.moveTo(dx, dy)
                    ctx.lineTo(dx+d, dy)
                } else if (i == 1) {//left
                    ctx.moveTo(dx, dy)
                    ctx.lineTo(dx, dy+d)
                } else if (i == 2) {//bottom
                    ctx.moveTo(dx, dy+d)
                    ctx.lineTo(dx+d, dy+d)
                } else if (i == 3) {//right
                    ctx.moveTo(dx+d, dy)
                    ctx.lineTo(dx+d, dy+d)
                }
                ctx.stroke()
            }
        })

        // CENTER
        let dc = this.info.drawCenter
            if (dc.length) {
            dc.forEach(dci=>{
                ctx.fillStyle = dci.color||"red"

                ctx.beginPath()
                ctx.arc(dx+this.r, dy+this.r, dci.cr||5, 0, C) 
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