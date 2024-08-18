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

    build(minLength=0, maxLength=Infinity, guidanceForce) {
        let nextPos = [], posX = this.startPos[0], posY = this.startPos[1]
        this.lastPositions = [[posX, posY]]
        //console.log("INIT: ["+posX+", "+posY+"]")

        while (nextPos && this.lastPositions.length < maxLength) {
            let step = 1, nextPositions = [{d:0, p:[posX, posY-step]}, {d:1, p:[posX+step, posY]}, {d:2, p:[posX, posY+step]}, {d:3, p:[posX-step, posY]}].filter(p=>
                !this.lastPositions.some(a=>equals(p.p, a)) && // not a already chosen position
                p.p[0] < this.maxX && p.p[0] >= 0 && // not outside maze (x)
                p.p[1] < this.maxY && p.p[1] >= 0 // not outsite maze (y)
            )

            
            //Guidance (more likely to go where less populated)
            if (nextPositions.length && guidanceForce !== null) {
                let sections = this.getRegion(nextPositions.length+1, [posX, posY], guidanceForce).reduce((a,b,i)=>(a[i]={d:i,v:(a[i-1]?.v??0)+b},a),[]).filter(x=>nextPositions.map(x=>x.d).includes(x.d)), randi = random(0, sections[sections.length-1]?.v??-1),
                    index = sections[sections.reduce((a,b)=>a[0]>b.v?(++a[1],a):a, [randi, 0])[1]].d
                //console.log(" --- AT: --- ", [posX, posY])
                //console.log("AVAILABLES:", nextPositions.map(x=>x.d), nextPositions.length)
                //console.log("SECTIONS:", sections.map(x=>x.v), randi, "%: ", sections.map(x=>x.v).reduce((a,b,i)=>(a[i]=(((b-(sections[i-1]?.v??0))/sections[sections.length-1].v)*100),a),[]).map(x=>x.toFixed(1)+"%"))//
                //console.log("CHOSEN: D =",index," - ", nextPositions.filter(x=>x.d==index)[0])
                nextPos = nextPositions.filter(x=>x.d==index)[0]
            } else nextPos = nextPositions[random(0, nextPositions.length-1)]

            if (nextPos) {
                this.lastPositions.push(nextPos.p)
                posX = nextPos.p[0]
                posY = nextPos.p[1]
            } // saves chosen position if present and updates current pos
        }

        if (this.lastPositions.length < minLength) this.build(minLength, maxLength)
        console.log("INIT: ["+posX+", "+posY+"]", "END: ["+this.lastPositions[this.lastPositions.length-1][0]+", "+this.lastPositions[this.lastPositions.length-1][1]+"] length:", this.lastPositions.length)

        return this.endPos = this.lastPositions[this.lastPositions.length-1]
    }

    show(colorIndex=2, cpositions=this.lastPositions) {
        this.info.show = {pos:[]}

        let rgb = [0,0,50]
        cpositions.forEach((p, i) => {
            let pos = maze.getPosition(p), pos2 = maze.getPosition(cpositions[i+1])
            let drgb = rgbIterator(rgb, colorIndex, 205/cpositions.length, 50, 255, true)
            pos.info.drawCenter.push({color:drgb, cr:3, type:"show"})
            if (pos2) this.info.show.pos.push({c1:[pos.cx, pos.cy], c2:[pos2.cx, pos2.cy], color:drgb, pos:p})
        })
    }

    hide() {
        this.info.show.pos.forEach(p=>{
            let pp = maze.getPosition(p.pos)
            pp.info.drawCenter = pp.info.drawCenter.filter(x=>x.type!=="show")
        })
        maze.getAdjacentPositions(this.info.show.pos[this.info.show.pos.length-1].pos).forEach(p=>p.info.drawCenter = p.info.drawCenter.filter(x=>x.type!=="show"))
        this.info.show = null
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

    getRegion(r, initPos, force=2) {// force: -10=extreme straight | -1=straight | 1=sinuous | 4=long sinuous | 10=worm | 50=long worm 
        let total = r*(r*2+1)
        return [this.lastPositions.filter(p=>p[0]>=initPos[0]-r&&p[0]<=initPos[0]+r && p[1]>=initPos[1]-r&&p[1]<initPos[1]), this.lastPositions.filter(p=>p[0]>initPos[0]&&p[0]<=initPos[0]+r && p[1]>=initPos[1]-r&&p[1]<=initPos[1]+r), this.lastPositions.filter(p=>p[0]>=initPos[0]-r&&p[0]<=initPos[0]+r && p[1]>initPos[1]&&p[1]<=initPos[1]+r), this.lastPositions.filter(p=>p[0]<initPos[0]&&p[0]>=initPos[0]-r && p[1]>=initPos[1]-r&&p[1]<=initPos[1]+r)]
        .map((x,i)=>{
            //console.log("D:",i,"V:",(total-x.length))
            return Math.round(((r) * ((total-x.length)/total)**2)**force)
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


//function customFunction(t, v, r) {
//    let dif = Math.abs(v-t)
//    return (dif<=r ? 1/((dif+0.75)/r) : Math.exp(-(dif-r)))*100
//}
//
//let r = 5, total = r*(r*2+1)
//for (let i=total;i>=0;i--) {console.log("v:",total-i, "=",customFunction(total, total-i, 3))}