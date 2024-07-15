const DEFAULT_COLOR = "aliceblue",
      C = 2*Math.PI



class Threshold {
    #DEFAULT_RADIUS = 25

    constructor(dx, dy, x, y, radius, walls) {// [0,0,0,0] | top right bottom left
        this.dx = dx
        this.dy = dy
        this.x = x
        this.y = y
        this.r = radius || this.#DEFAULT_RADIUS
        this.c = DEFAULT_COLOR
        this.w = walls || []
    }


    draw() {
        let d = this.r*2, dx = this.dx, dy = this.dy
        ctx.fillStyle = ctx.strokeStyle = this.c
        ctx.lineWidth = 2

        this.w.forEach((w, i)=>{
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
    }

    drawCenter(color, cr=5) {
        let r = this.r, dx = this.dx, dy = this.dy
        ctx.fillStyle = ctx.strokeStyle = color||"red"

        ctx.beginPath()
        ctx.arc(dx+r, dy+r, cr, 0, C) 
        ctx.fill()

        ctx.fillStyle = ctx.strokeStyle = DEFAULT_COLOR
    }

    
}