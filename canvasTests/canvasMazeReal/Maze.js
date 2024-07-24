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

        this.path.show()

        this.shape(true) //
    }

    // createPositions() {}

    seedBuild(seed, startPos) {
        let v = [...seed.match(/^[0-9a-f]+/gi)[0]], w = +seed.match(/[0-9]+$/gi)
        this.width = w
        this.height = (v.length*2)/w

        this.postitions = []
        this.path = null
        console.log(this.width, this.height)

        for (let y=0,i=-1;y<this.height;y++) {
            this.postitions[y] = []
            let posY = this.startY+this.radius*y*2
            for (let x=0;x<this.width;x++) {
                let posX = this.startX+this.radius*x*2, walls, w_ll
                if (!(x%2-y%2)) {
                    walls = [...parseInt(v[++i],16).toString(2)].toReversed().map(x=>+x), w_ll = walls.length
                    walls.length = 4
                    walls.fill(0, w_ll, 4)
                }
                
                this.postitions[y][x] = x%2-y%2 ? new Between(posX, posY, x, y, this.radius, this.postitions) : new Threshold(posX, posY, x, y, this.radius, walls)
            }
        }
    }

    getPosition(x, y) {
        return typeof x == "object" ? this.postitions?.[x[1]]?.[x[0]] : this.postitions?.[y]?.[x]
    }

    getAdjacentPositions(x, y) {
        return typeof x == "object" ? 
        [this.postitions?.[x[1]]?.[x[0]-1], this.postitions?.[x[1]+1]?.[x[0]], this.postitions?.[x[1]]?.[x[0]+1], this.postitions?.[x[1]-1]?.[x[0]]] : 
        [this.postitions?.[y-1]?.[x], this.postitions?.[y]?.[x+1], this.postitions?.[y+1]?.[x], this.postitions?.[y]?.[x-1]]
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

        if (randomUnused) this.unusedPositions.filter(x=>x.type=="threshold").forEach((p,i)=>{// TO RECHECK JAR
            let rw = [random(0,1),random(0,1),random(0,1),random(0,1)]//[random(0,(i+1)%4),random(0,(i+1)%4),random(0,(i+1)%4),random(0,(i+1)%4)]
            p.walls = rw
        })
    }

    getPositionHitboxes(position) {
        let {x, y} = position, box = [this.postitions?.[y-1]?.[x-1], this.postitions?.[y-1]?.[x], this.postitions?.[y-1]?.[x+1], this.postitions?.[y]?.[x-1], position, this.postitions?.[y]?.[x+1], this.postitions?.[y+1]?.[x-1], this.postitions?.[y+1]?.[x], this.postitions?.[y+1]?.[x+1]]
        return box.map(p=>p?.walls.map((w,i)=>{
            let r = this.radius*2, lw = ctx.lineWidth*2, hbs
            if (i==0) hbs=[[p.dx, p.dy], [p.dx+r, p.dy+lw]]
            else if (i==1) hbs=[[p.dx+r, p.dy], [p.dx+r+lw, p.dy+r]]
            else if (i==2) hbs=[[p.dx, p.dy+r], [p.dx+r, p.dy+r+lw]]
            else if (i==3) hbs=[[p.dx, p.dy], [p.dx+lw, p.dy+r]]
            return w&&hbs
        })).flatMap(x=>x).filter(x=>x)
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

    getRandomSeed(width=5, height=5) {
        return randomHexString(width*height)+"x"+width
    }

    get seed() {//this.startPos[0]+"o"+this.startPos[1]+"x"+ FOR THE STARTPOS
        return this.postitions.flatMap(x=>x).filter(x=>x.type=="threshold").map(x=>x.walls.reduce((a,b,i)=>a+(b*2**i),0)).map(x=>x.toString(16)).join("")+"x"+this.width
    }


    get unusedPositions() {
        return this.postitions.flatMap(x=>x).filter(x=>!this.path.lastPositions.some(a=>equals([x.x,x.y], a)))
    }
    
    get endX() {
        return maze.width*maze.radius*2+maze.startX
    }

    get endY() {
        return maze.height*maze.radius*2+maze.startY
    }
}