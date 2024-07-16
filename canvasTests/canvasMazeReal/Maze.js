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

    build(minPathLength=8, maxPathLength=Infinity, startPos=[random(0, this.width-1), 0]) {
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

        this.path.build(minPathLength, maxPathLength) // build path

        maze.getPosition(this.path.startPos).info.drawCenter.push({color:"red", cr:5}) // show start
        maze.getPosition(this.path.endPos).info.drawCenter.push({color:"lime", cr:5})  // show end

        this.shape()
        this.solve()//path.show()
    }

    getPosition(x, y) {
        return typeof x == "object" ? this.postitions?.[x[1]]?.[x[0]] : this.postitions?.[y]?.[x]
    }

    shape() {
        let positions = this.path.lastPositions.map(p=>this.getPosition(p))
        positions.forEach((p, i) => {
            let p2 = positions[i-1]

            //p.walls = [1,1,1,1]

            //if (p2) {
            //    let x = p[0]-p[2], y = p[1]-p[1]
            //    
            //    if (x == 1) {// right
            //        p2.walls = [1,0,1,1]
            //    } else if (x == -1) {// left 
            //        p2.walls = [1,1,1,0]
            //    } else if (y == 1) {// top
            //        p2.walls = [0,1,1,1]
            //    } else if (y == -1) {// bottom
            //        p2.walls = [1,1,0,1]
            //    } 
            //}
        })
    }

    solve() {// visible pathfind
        this.path.show() // show path
    }

    draw(ctx) {
        maze.postitions.flatMap(x=>x).forEach(p=>{
            p.draw(ctx)
        })

        maze.path.draw()
    }


    
}