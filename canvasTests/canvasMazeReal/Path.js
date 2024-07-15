class Path {
    constructor(x, y, maxX, maxY) {
        this.x = x
        this.y = y
        this.maxX = maxX
        this.maxY = maxY
        this.lastPositions = []
        this.rgb = [0, 0, 50]
    }

    create(minLength=0, maxLength=Infinity) {
        let nextPos = this.lastPositions = [],
            posX = this.x, posY = this.y
            console.log(this.x, this.y)

        while (nextPos && this.lastPositions.length < maxLength) {
            let nextPositions = [[posX+1, posY], [posX, posY+1], [posX-1, posY], [posX, posY-1]].filter(p=>
                !this.lastPositions.some(a=>equals(p, a)) && // not a already chosen position
                p[0] < this.maxX && p[0] >= 0 && // not outside maze (x)
                p[1] < this.maxY && p[1] >= 0 // not outsite maze (y)
            )

            console.log("AT ["+posX+", "+posY+"] POSSIBLES: ", nextPositions)
            if (nextPos = nextPositions[random(0, nextPositions.length-1)]) {
                this.lastPositions.push(nextPos)
                posX = nextPos[0]
                posY = nextPos[1]
                console.log("CHOSE: ", nextPos)
            } // saves chosen position if present and updates current pos
        }

        if (this.lastPositions.length < minLength) this.create(minLength, maxLength)

        console.log("----- END ----- length:", this.lastPositions.length)
    }

    show(pos) {
        pos.forEach(p => maze.getPosition(p).drawCenter(rgbIterator(this.rgb, 2, 10, 50, 255, true), 3))
    }


    
}