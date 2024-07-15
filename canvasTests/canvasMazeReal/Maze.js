class Maze {
    #DEFAULT_WIDTH = 5
    #DEFAULT_HEIGHT = 6

    constructor(width, height, startX, startY, radius=25) {
        this.width = width   || 5 // pos
        this.height = height || 5 // pos
        this.startX = startX || 50 // px
        this.startY = startY || 50 // px
        this.radius = radius || 25 // px
        this.start = null
        this.postitions = []

    }

    build(radius=this.radius) {
        // Create postions
        for (let y=0;y<this.height;y++) {
            this.postitions[y] = []
            let posY = this.startY+radius*y*2
            for (let x=0;x<this.width;x++) {
                let posX = this.startX+radius*x*2,
                pos = x%2-y%2 ? new Between(posX, posY, x, y, radius) : new Threshold(posX, posY, x, y, radius, [1,1,1,1])
                this.postitions[y][x] = pos
                if (!(x%2-y%2)) pos.draw()
            }
        }

        // create start
        this.start = [random(0, this.width-1), 0]
        this.getPosition(this.start).drawCenter()

        // Create path
        let path = new Path(this.start[0], this.start[1], this.width, this.height)
        path.create()
        console.log(path)
        path.show(path.lastPositions, this.startX, this.startY, this.radius)

    }

    getPosition(x, y) {
        return typeof x == "object" ? this.postitions[x[1]][x[0]] : this.postitions[y][x]
    }

    reset() {// rebuild

    }

    solve() {// visible pathfind

    }



    
}