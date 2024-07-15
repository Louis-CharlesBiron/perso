class Between {

    constructor(dx, dy, x, y, radius) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.r = radius
        this.walls = []
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