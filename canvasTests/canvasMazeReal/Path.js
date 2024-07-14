class Path {
    constructor(x, y, maxX, maxY) {
        this.x = x
        this.y = y
        this.maxX = maxX
        this.maxY = maxY
        this.lastPositions = []
    }

    create(minLength=0, maxLength=Infinity) {
        let nextPos = this.lastPositions = []
        console.log(nextPos, minLength, maxLength)

        while (nextPos && this.lastPositions.length < maxLength) {
            let nextPositions = [[this.x+1, this.y], [this.x, this.y+1], [this.x-1, this.y], [this.x, this.y-1]].filter(p=>
                !this.lastPositions.some(a=>equals(p, a)) && // not a already chosen position
                p[0] <= this.maxX && p[0] >= 0 && // not outside maze (x)
                p[1] <= this.maxY && p[1] >= 0 // not outsite maze (y)
            )
            console.log("POSSIBLES: ", nextPositions)
            if (nextPos = nextPositions[random(0, nextPositions.length-1)]) this.lastPositions.push(nextPos)
            console.log("CHOSE: ", nextPos)
        }

        if (this.lastPositions.length < minLength) this.create(minLength, maxLength)

        console.log("----- END -----", nextPos, this.lastPositions.length)
    }

    show(pos, x, y, r) {
        ctx.fillStyle = "red"


        pos.forEach(v=>{
            let posX = x+r*v[0]*2, posY = y+r*v[1]*2
            ctx.beginPath()
            ctx.rect(posX-5, posY-5, 15, 15)
            ctx.fill()
        })
    }


    
}