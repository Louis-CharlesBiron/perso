class Maze {
    #DEFAULT_WIDTH = 5
    #DEFAULT_HEIGHT = 6

    constructor(width, height, startX, startY, radius=25) {
        this.width = width   || 5 // pos
        this.height = height || 5 // pos
        this.startX = startX || 10 // px
        this.startY = startY || 20 // px
        this.radius = radius || 25 // px
        this.postitions = []
        this.path = null
    }

    build(startPos=[random(0, this.width-1), random(0, this.height-1)], minPathLength=8, maxPathLength=Infinity, guidanceForce) {
        if (!startPos?.length) startPos = [random(0, this.width-1), random(0, this.height-1)]
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

        this.path.build(minPathLength, maxPathLength, guidanceForce) // build path

        maze.getPosition(this.path.startPos).info.drawCenter.push({color:"red", cr:5}) // show start
        maze.getPosition(this.path.endPos).info.drawCenter.push({color:"lime", cr:5})  // show end

        //this.path.show()

        this.shape() //
    }

    // createPositions() {}

    seedBuild(seed, startPos) {
        let v = [...seed.match(/^[0-9a-f]+/gi)[0]], w = +seed.match(/[0-9]+$/gi)
        this.width = w
        this.height = (v.length*2)/w

        this.postitions = []
        this.path = null
        console.log(this.width, this.height)

        for (let y=0,i=0;y<this.height;y++) {
            this.postitions[y] = []
            let posY = this.startY+this.radius*y*2
            for (let x=0;x<this.width;x++) {
                if (!(x%2-y%2)) i++
                let posX = this.startX+this.radius*x*2, walls = [...parseInt(v[i],16).toString(2)].toReversed().map(x=>+x), w_ll = walls.length
                walls.length = 4
                walls.fill(0, w_ll, 4)
                console.log(i, v[i], walls, (x%2-y%2)?"between":"threshold")
                this.postitions[y][x] = x%2-y%2 ? new Between(posX, posY, x, y, this.radius, this.postitions) : new Threshold(posX, posY, x, y, this.radius, walls)
            }
        }
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

    solve() {// pathfind

    }

    reset(startPos, minPathLength, maxPathLength, guidanceForce) {
        this.postitions = []
        this.path = null
        this.build(startPos, minPathLength, maxPathLength, guidanceForce)
    }

    draw(ctx) {
        maze.postitions.flatMap(x=>x).forEach(p=>{
            p.draw(ctx)
        })

        if (maze.path) maze.path.draw()

        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.rect(this.startX, this.startY, this.width*this.radius*2, this.height*this.radius*2)
        ctx.stroke()
    }

    get seed() {//this.startPos[0]+"o"+this.startPos[1]+"x"+ FOR THE STARTPOS
        return this.postitions.flatMap(x=>x).filter(x=>x.type=="threshold").map(x=>x.walls.reduce((a,b,i)=>a+(b*2**i),0)).map(x=>x.toString(16)).join("")+"x"+this.width
    }


    get unusedPositions() {
        return this.postitions.flatMap(x=>x).filter(x=>!this.path.lastPositions.some(a=>equals([x.x,x.y], a)))
    }
    
}