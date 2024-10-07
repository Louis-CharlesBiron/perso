let t=1<<0, r=1<<1, l=1<<2, b=1<<3, tr=1<<4, br=1<<5, bl=1<<6, tl=1<<7

const alphabet = {
    A: [
        [2,bl+br],
        [1,bl],[3,br],
        [0,r+b],[1,r],[2],[3,l],[4,l+b],
        [0,b],[4,b],
        [0],[4]
    ]
}

class Letters extends Shape {
    constructor(text, pos=[0,0], gaps=[25, 25], letterSpacing, fontAlphabet=alphabet5, radius, rgba, limit, drawEffectCB) {
        super(null, radius, rgba, limit, drawEffectCB)

        this._text = text // text
        this._pos = pos // position of the text
        this._gaps = gaps // [x, y] gap length within the dots
        this._letterSpacing = letterSpacing // gap length within letters 
        this._fontAlphabet = fontAlphabet // source alphabet

        //if (this._text) super.add(this.createText(this._text, [-75,0], [15, 15]))
        //console.log(this.createText(this._text, [-75,0], [15, 15]))
    }

    createText(text, pos=[0,0], gaps=[25, 25], letterSpacing, fontAlphabet=alphabet5) {
        let [x, y] = pos, letters=[]
        letterSpacing ??= fontAlphabet.width*gaps[0]+gaps[0]-fontAlphabet.width+this._radius
        ;[...text].forEach(l=>{
            let letter //this.createFromString(fontAlphabet[l.toUpperCase()]||" ", [x=l=="\n"?pos[0]:x+letterSpacing, y+=l=="\n"&&fontAlphabet.width*gaps[1]+this.radius], gaps)
            
            letters.push(letter)
        })
        return letters.flat()
    }

    createLetter(letter, pos) {
        let dotGroup = [], [gx, gy] = this._gaps,
        yi=0, // y index
        ar = Math.sqrt(alphabet.width*alphabet.height) // alphabetRadius
        alphabet.A.map((d,i,a)=>[new Dot(this._pos[0]+d[0]*gx, this._pos[1]+(yi+=d[0]<a[i-1]?.[0])*gy), d[1], ]).forEach((d,i,a)=>{
            let [dot, c] = d
            if (c&t) dot.addConnection(a.find(d=>d[0].x==dot.x&&d[0].y==dot.y-gy)?.[0])
            if (c&r) dot.addConnection(a.find(d=>d[0].x==dot.x+gx&&d[0].y==dot.y)?.[0])
            if (c&b) dot.addConnection(a.find(d=>d[0].x==dot.x&&d[0].y==dot.y+gy)?.[0])
            if (c&l) dot.addConnection(a.find(d=>d[0].x==dot.x-gx&&d[0].y==dot.y)?.[0])

            if (c&tr) dot.addConnection(a.find(d=>d[0].x==dot.x+gx&&d[0].y==dot.y-gy)?.[0])
            if (c&tl) dot.addConnection(a.find(d=>d[0].x==dot.x-gx&&d[0].y==dot.y-gy)?.[0])
            if (c&br) dot.addConnection(a.find(d=>d[0].x==dot.x+gx&&d[0].y==dot.y+gy)?.[0])
            if (c&bl) dot.addConnection(a.find(d=>d[0].x==dot.x-gx&&d[0].y==dot.y+gy)?.[0])
            
            console.log(d, dot.x, dot.y)
            super.add(dot)
        })
    }
}