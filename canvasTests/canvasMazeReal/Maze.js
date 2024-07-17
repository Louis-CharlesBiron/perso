class Maze {
    #DEFAULT_WIDTH = 5
    #DEFAULT_HEIGHT = 6

    constructor(width, height, startX, startY, radius=25) {
        this.width = width   || 5 // pos
        this.height = height || 5 // pos
        this.startX = startX || 50 // px
        this.startY = startY || 50 // px
        this.radius = radius || 25 // px
        this.postitions = []
        this.path = null
    }

    build(startPos=[random(0, this.width-1), random(0, this.height-1)], minPathLength=8, maxPathLength=Infinity, disableGuidance) {
        // Create postions
        for (let y=0;y<this.height;y++) {
            this.postitions[y] = []
            let posY = this.startY+this.radius*y*2
            for (let x=0;x<this.width;x++) {
                let posX = this.startX+this.radius*x*2
                this.postitions[y][x] = x%2-y%2 ? new Between(posX, posY, x, y, this.radius, this.postitions) : new Threshold(posX, posY, x, y, this.radius, [0,0,0,0])
            }
        }

        // Create path
        this.path = new Path(startPos, this.width, this.height)

        this.path.build(minPathLength, maxPathLength, disableGuidance) // build path

        maze.getPosition(this.path.startPos).info.drawCenter.push({color:"red", cr:5}) // show start
        maze.getPosition(this.path.endPos).info.drawCenter.push({color:"lime", cr:5})  // show end

        this.shape()
        this.solve()
    }

    getPosition(x, y) {
        return typeof x == "object" ? this.postitions?.[x[1]]?.[x[0]] : this.postitions?.[y]?.[x]
    }

    shape(randomUnused) {
        let positions = this.path.lastPositions.map(p=>this.getPosition(p))
        positions.forEach((p,i)=>{
            p.walls = [1,1,1,1];
            [positions[i-1], positions[i+1]].filter(x=>x).forEach(px => {
                let x = px.x-p.x, y = px.y-p.y
                if (x == 1) px.walls = [null,null,null,0]
                else if (x == -1) px.walls = [null,0,null,null]
                else if (y == 1) px.walls = [0,null,null,null]
                else if (y == -1) px.walls = [null,null,0,null]
            })
        })

        if (randomUnused) this.unusedPositions.forEach((p,i)=>{
            let rw = [random(0,(i+1)%5),random(0,(i+1)%5),random(0,(i+1)%5),random(0,(i+1)%5)]
            p.walls = rw
        })
    }

    solve() {// visible pathfind
        this.path.show() // show path
    }

    reset(startPos, minPathLength, maxPathLength, disableGuidance) {
        this.postitions = []
        this.path = null
        this.build(startPos, minPathLength, maxPathLength, disableGuidance)
    }

    draw(ctx) {
        maze.postitions.flatMap(x=>x).forEach(p=>{
            p.draw(ctx)
        })

        maze.path.draw()

        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.rect(this.startX, this.startY, this.width*this.radius*2, this.height*this.radius*2)
        ctx.stroke()
    }

    get unusedPositions() {
        return this.postitions.flatMap(x=>x).filter(x=>!this.path.lastPositions.some(a=>equals([x.x,x.y], a)))
    }
    
}