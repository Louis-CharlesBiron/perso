class Path {
    constructor(startPos, maxX, maxY) {
        this.startPos = startPos
        this.endPos = null
        this.maxX = maxX
        this.maxY = maxY
        this.lastPositions = []
        this.info = {
            show:null //pos:{c1:[x,y], c2:[x,y], color:"red"}
        }
    }

    build(minLength=0, maxLength=Infinity) {
        let nextPos = [], posX = this.startPos[0], posY = this.startPos[1]
        this.lastPositions = [[posX, posY]]
        console.log("INIT: ["+posX+", "+posY+"]")

        while (nextPos && this.lastPositions.length < maxLength) {
            let nextPositions = [[posX+1, posY], [posX, posY+1], [posX-1, posY], [posX, posY-1]].filter(p=>
                !this.lastPositions.some(a=>equals(p, a)) && // not a already chosen position
                p[0] < this.maxX && p[0] >= 0 && // not outside maze (x)
                p[1] < this.maxY && p[1] >= 0 // not outsite maze (y)
            )

            if (nextPos = nextPositions[random(0, nextPositions.length-1)]) {
                this.lastPositions.push(nextPos)
                posX = nextPos[0]
                posY = nextPos[1]
            } // saves chosen position if present and updates current pos
        }

        if (this.lastPositions.length < minLength) this.build(minLength, maxLength)
        console.log("END: ["+this.lastPositions[this.lastPositions.length-1][0]+", "+this.lastPositions[this.lastPositions.length-1][1]+"] length:", this.lastPositions.length)

        return this.endPos = this.lastPositions[this.lastPositions.length-1]
    }

    show(colorIndex=2, cpositions=this.lastPositions) {
        this.info.show = {pos:[]}

        let rgb = [0,0,50]
        cpositions.forEach((p, i) => {
            let pos = maze.getPosition(p), pos2 = maze.getPosition(cpositions[i+1])
            let drgb = rgbIterator(rgb, colorIndex, 205/cpositions.length, 50, 255, true)
            pos.info.drawCenter.push({color:drgb, cr:3})
            if (pos2) this.info.show.pos.push({c1:[pos.cx, pos.cy], c2:[pos2.cx, pos2.cy], color:drgb})
        })
    }

    draw() {
        let s = this.info.show
        if (s) {
            s.pos.forEach(p=>{
                ctx.strokeStyle = p.color
                ctx.beginPath()
                ctx.moveTo(p.c1[0], p.c1[1])
                ctx.lineTo(p.c2[0], p.c2[1])
                ctx.stroke()
                ctx.strokeStyle = DEFAULT_COLOR
            })
        }
    }

    
}