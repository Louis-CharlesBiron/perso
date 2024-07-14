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
        let r = this.r, dx = this.dx, dy = this.dy
        ctx.fillStyle = ctx.strokeStyle = this.c
        ctx.lineWidth = 2

        this.w.forEach((w, i)=>{
            if (w) {
                ctx.beginPath()
                if (i == 0) {//top
                    ctx.moveTo(dx+r*2, dy-r*2)
                    ctx.lineTo(dx, dy-r*2)
                } else if (i == 1) {//left
                    ctx.moveTo(dx+r*2, dy)
                    ctx.lineTo(dx+r*2, dy-r*2)
                } else if (i == 2) {//bottom
                    ctx.moveTo(dx, dy)
                    ctx.lineTo(dx+r*2, dy)
                } else if (i == 3) {//right
                    ctx.moveTo(dx, dy-r*2)
                    ctx.lineTo(dx, dy)
                }
                ctx.stroke()
            }
        })
    }

    drawCenter() {
        let r = this.r, dx = this.dx, dy = this.dy
        ctx.beginPath()
        ctx.arc(dx, dy, 5, 0, C) 
        ctx.filkl()
    }

    
}