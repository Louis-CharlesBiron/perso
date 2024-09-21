// JS
// Canvas Dot Effects by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

class Shape {

    constructor(dots, radius, rgba, limit, drawEffectCB) {
        this._ctx
        this._id = idGiver++
        this._radius = radius
        this._rgba = rgba
        this._limit = limit
        this._dots = []
        this._ratioPos = [Infinity,Infinity]
        this._drawEffectCB = drawEffectCB // (ctx, Dot, ratio)
        if (dots?.length) this.add(dots)
    }

    add(dot) {
        this._dots.push(...[dot].flat().map(x=>{
            x.rgba = [...this._rgba]
            x.radius = this._radius
            x.parent = this
            return x
        }))
    }

    create(str, topLeftPos=[0,0], gaps=[25, 25], dotChar="o") {
        let endPoint = []
        str.split("\n").filter(x=>x).forEach((x,i)=>{
            let [atX, atY] = topLeftPos
            atY+=i*gaps[1];
            [...x].forEach(c=>{
                atX+=gaps[0]
                if (c==dotChar) this.add(new Dot(atX+gaps[0]/2, atY+gaps[1]/2))
            })
            endPoint.push([atX+gaps[0]/2, atY+gaps[1]/2])
        })
        return endPoint.last()
    }

    setRadius(radius) {
        this._radius = radius
        this._dots.forEach(x=>x.radius=radius)
    }

    setRGBA(rgba) {
        this._rgba = rgba
        this._dots.forEach(x=>x.rgba=rgba)
    }

    setLimit(limit) {
        this._limit = limit
        this._dots.forEach(x=>x.limit=limit)
    }


    get ctx() {return this._ctx}
    get id() {return this._id}
    get dots() {return this._dots}
    get rgba() {return this._rgba}
    get limit() {return this._limit}
    get r() {return this._rgba[0]}
    get g() {return this._rgba[1]}
    get b() {return this._rgba[2]}
    get a() {return this._rgba[3]}
    get drawEffectCB() {return this._drawEffectCB}
    get ratioPos() {return this._ratioPos}

    set ratioPos(ratioPos) {this._ratioPos = ratioPos}
    set drawEffectCB(cb) {return this._drawEffectCB = cb}
}