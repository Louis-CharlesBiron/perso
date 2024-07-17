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

    build(minLength=0, maxLength=Infinity, disableGuidance) {
        let nextPos = [], posX = this.startPos[0], posY = this.startPos[1]
        this.lastPositions = [[posX, posY]]
        console.log("INIT: ["+posX+", "+posY+"]")

        while (nextPos && this.lastPositions.length < maxLength) {
            let nextPositions = [{d:0, p:[posX+1, posY]}, {d:1, p:[posX, posY+1]}, {d:2, p:[posX-1, posY]}, {d:3, p:[posX, posY-1]}].filter(p=>
                !this.lastPositions.some(a=>equals(p.p, a)) && // not a already chosen position
                p.p[0] < this.maxX && p.p[0] >= 0 && // not outside maze (x)
                p.p[1] < this.maxY && p.p[1] >= 0 // not outsite maze (y)
            )

            console.log("AT:", [posX, posY])
            
            //Guidance (more likely to go where less populated)
            if (!disableGuidance) {
                let stats = this.getRegion(3, [posX, posY]),
                initNextPositions = [...nextPositions]
            
                console.log(nextPositions.map(x=>x.d), stats)
                initNextPositions.forEach(p=>{
                    for (let i=0;i<stats[p.d];i++) nextPositions.push(p)
                })
            }

            if (nextPos = nextPositions[random(0, nextPositions.length-1)]) {
                this.lastPositions.push(nextPos.p)
                posX = nextPos.p[0]
                posY = nextPos.p[1]
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

    getRegion(r, initPos) {
        let total = r*(r*2+1)
        return [this.lastPositions.filter(p=>p[0]>=initPos[0]-r&&p[0]<=initPos[0]+r && p[1]>=initPos[1]-r&&p[1]<initPos[1]), this.lastPositions.filter(p=>p[0]>initPos[0]&&p[0]<=initPos[0]+r && p[1]>=initPos[1]-r&&p[1]<=initPos[1]+r), this.lastPositions.filter(p=>p[0]>=initPos[0]-r&&p[0]<=initPos[0]+r && p[1]>initPos[1]&&p[1]<=initPos[1]+r), this.lastPositions.filter(p=>p[0]<initPos[0]&&p[0]>=initPos[0]-r && p[1]>=initPos[1]-r&&p[1]<=initPos[1]+r)]
        .map((x,i)=>{
            //let v = total-x.length, prop = v-((total-v)/2)-total
            //console.log(i, "->", (Math.sign(prop)+1) ? (prop**2)/total : 0)
            //return (Math.sign(prop)+1) ? (prop**2)/total : 0
            let difference = Math.abs(value - total), res
    
            if (difference <= radius) {
                res = 1
            } else {
                // Exponentially decreasing values when |value - total| > radius
                rss = Math.exp(-0.5 * (difference - radius))
            }

        })
    }
    
}



//INIT [5,5]
//[5,4] ↑ : y-n
//[6,4] ↗ : x+n y-n
//[6,5] → : x+n
//[6,6] ↘ : x+n y+n
//[5,6] ↓ : y+n
//[4,6] ↙ : x-n y+n
//[4,5] ← : x-n
//[4,4] ↖ : x-n y-n


function customFunction(t, v, r) {
    let dif = Math.abs(v-t)
    return (dif<=r ? 1/((dif+0.75)/r) : Math.exp(-(dif-r)))*100
}

let r = 5, total = r*(r*2+1)
for (let i=total;i>=0;i--) {console.log("v:",total-i, "=",customFunction(total, total-i, 3))}