class Between {

    constructor(dx, dy, x, y) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.walls = []
    }

    drawCenter() {
        let r = this.r, dx = this.dx, dy = this.dy
        ctx.beginPath()
        ctx.arc(dx, dy, 5, 0, C) 
        ctx.filkl()
    }


    
}