const D = [["t","-ar"],["r",1],["b","ar"],["l",-1],["tr","1-ar"],["br","ar+1"],["bl","ar-1"],["tl","-ar-1"]].reduce((a,[b,d],i)=>(a.places.push([a[b]=1<<i,(ar)=>new Function("ar",`return ${d}`)(ar)]),a),{places:[]})

const fontSource = {
    width:5,
    height:5,
    A: [
        [2,D.bl+D.br],
        [1,D.bl],[3,D.br],
        [0,D.r+D.b],[1,D.r],[2,D.r],[3,D.r],[4,D.b],
        [0,D.b],[4,D.b],
        [0],[4]
    ],
    B: [
        [0,D.r+D.b],[,D.r],[,D.r],[,D.br],
        [0,D.b],[4,D.bl],
        [0,D.r+D.b],[,D.r],[,D.r],[,D.br],
        [0,D.b],[4,D.bl],
        [0,D.r],[,D.r],[,D.r],[]
    ],
    C: [
        [1,D.r+D.bl],[,D.r],[,D.r],[],
        [0,D.b],
        [0,D.b],
        [0,D.br],
        [-1,D.r],[2,D.r],[,D.r],[]
      ],
    D: [
        [0,D.r+D.b],[,D.r],[,D.r],[,D.br],
        [0,D.b],[4,D.b],
        [0,D.b],[4,D.b],
        [0,D.b],[4,D.bl],
        [0,D.r],[,D.r],[,D.r],[]
    ],E: [
        [0,D.r+D.b],[,D.r],[,D.r],[,D.r],[],
        [0,D.b],
        [0,D.b+D.r],[,D.r],[,D.r],[,D.r],
        [0,D.b],
        [0,D.r],[,D.r],[,D.r],[,D.r],[]
    ],F: [
        [0,D.r+D.b],[,D.r],[,D.r],[,D.r],[],
        [0,D.b],
        [0,D.b+D.r],[,D.r],[,D.r],[],
        [0,D.b],
        [0]
    ],G: [
        [1,D.r+D.bl],[,D.r],[,D.r],[],
        [0,D.b],
        [0,D.b],[3,D.r],[4,D.b],
        [0,D.br],[4,D.b],
        [1,D.r],[,D.r],[,D.r],[]
    ],H: [
        [0,D.r+D.b],[4,D.b],
        [0,D.b],[4,D.b],
        [0,D.b+D.r],[,D.r],[,D.r],[,D.r],[,D.b],
        [0,D.b],[4,D.b],
        [0],[4]
    ],I: [
        [1,D.r],[,D.b+D.r],[],
        [2,D.b],
        [2,D.b],
        [2,D.b],
        [1,D.r],[,D.r],[]
    ],J: [
        [1,D.r],[,D.r],[,D.b+D.r],[],
        [3,D.b],
        [3,D.b],
        [0,D.br],[3,D.bl],
        [1,D.r],[,D.r]
    ],K: [
        [0,D.b],[3,D.bl],
        [0,D.b],[2,D.bl],
        [0,D.b+D.r],[,D.r+D.br],
        [0,D.b],[2,D.br],
        [0],[3,D.r]
    ],L: [
        [0,D.b],
        [0,D.b],
        [0,D.b],
        [0,D.b],
        [0,D.r],[,D.r],[,D.r],[,D.r]
    ],M: [
        [0,D.b+D.br],[4,D.b+D.bl],
        [0,D.b],[,D.br],[3,D.bl],[4,D.b],
        [0,D.b],[2],[4,D.b],
        [0,D.b],[4,D.b],
        [0],[4]
    ],N: [
        [0,D.b+D.br],[4,D.b],
        [0,D.b],[,D.br],[4,D.b],
        [0,D.b],[2,D.br],[4,D.b],
        [0,D.b],[3,D.br],[4,D.b],
        [0],[4]
    ],O: [
        [1,D.bl+D.r],[,D.r],[,D.br],
        [0,D.b],[4,D.b],
        [0,D.b],[4,D.b],
        [0,D.b+D.br],[4,D.b+D.bl],
        [1,D.r],[,D.r],[,D.r]
    ],P: [
        [0,D.r+D.b],[,D.r],[,D.br],
        [0,D.b],[3,D.bl],
        [0,D.b+D.r],[,D.r],[],
        [0,D.b],
        [0]
    ],Q: [
        [1,D.bl+D.r],[,D.r],[,D.br],
        [0,D.b],[4,D.b],
        [0,D.b],[4,D.b],
        [0,D.b+D.br],[3,D.br],[,D.bl],
        [1,D.r],[,D.r],[],[]
    ],R: [
        [0,D.r+D.b],[,D.r],[,D.br],
        [0,D.b],[3,D.bl],
        [0,D.b+D.r],[,D.r+D.br],[],
        [0,D.b],[2,D.br],
        [0],[3]
    ],S: [
        [1,D.r+D.bl],[,D.r],[,D.r],[],
        [0,D.br],
        [-1,D.r],[2,D.r],[,D.br],
        [-4,D.bl],
        [0,D.r+D.bl],[,D.r],[,D.r],[]
    ],T: [
        [0,D.r],[,D.r],[,D.b+D.r],[,D.r],[],
        [2,D.b],
        [2,D.b],
        [2,D.b],
        [2]
    ],U: [
        [0,D.r+D.b],[4,D.b],
        [0,D.b],[4,D.b],
        [0,D.b+D.r],[4,D.b],
        [0,D.br],[4,D.bl],
        [1,D.r],[,D.r],[,D.r]
    ],V: [
        [0,D.r+D.b],[4,D.b],
        [0,D.b],[4,D.b],
        [0,D.br],[4,D.bl],
        [1,D.br],[3,D.bl],
        [2,D.r],
    ],W: [
        [0,D.b+D.br],[4,D.b+D.bl],
        [0,D.b],[4,D.b],
        [0,D.b],[2,D.bl+D.br],[4,D.b],
        [0,D.b],[,D.bl],[3,D.br],[4,D.b],
        [0],[4]
    ],X: [
        [0,D.br],[4,D.bl],
        [1,D.br],[3,D.bl],
        [2,D.br+D.bl],
        [1,D.bl],[3,D.br],
        [0],[4]
    ],Y: [
        [0,D.br],[4,D.bl],
        [1,D.br],[3,D.bl],
        [2,D.b],
        [2,D.b],
        [2]
    ],Z: [
        [0,D.r],[,D.r],[,D.r],[,D.r],[,D.bl],
        [3,D.bl],
        [2,D.bl],
        [1,D.bl],
        [0,D.r],[,D.r],[,D.r],[,D.r],[]
    ]
}

class Letters extends Shape {
    constructor(text, gaps=[25, 25], letterSpacing, font, pos, radius, rgba, limit, drawEffectCB) {
        super(pos, null, radius, rgba, limit, drawEffectCB)

        this._text = text // text
        this._gaps = gaps ?? [25, 25]// [x, y] gap length within the dots
        this._font = font ?? fontSource// source font
        this._letterSpacing = letterSpacing ?? this._font.width*this._gaps[0]+this._gaps[0]-this.font.width+this._radius // gap length within letters 

        if (this._text) super.add(this.createText())
    }

    createText(text=this._text, pos=super.pos, gaps=this._gaps, letterSpacing=this._letterSpacing, font=this._font) {
        let [cx, cy] = pos, isNewLine=true, letters=[]
        ;[...text].forEach(l=>{
            let letter = this.createLetter(l, [cx=(l=="\n")?pos[0]:(cx+letterSpacing*(!isNewLine)), cy+=(l=="\n")&&font.width*gaps[1]+this.radius])
            isNewLine = (l=="\n")
            letters.push(letter)
        })
        return letters.flat()
    }

    createLetter(letter, pos=super.pos) {
        let dotGroup = [], [gx, gy] = this._gaps,
        xi=[0,0], yi=0, // y index
        ar = Math.sqrt(this._font.width*this._font.height), // fontRadius
        l = this._font[letter.toUpperCase()]
        if (l) l.map((d,i)=>[new Dot(pos[0]+(xi[0]=d[0]??xi[0]+1,isNaN(Math.abs(d[0]))?xi[0]:Math.abs(d[0]))*gx, pos[1]+(yi+=(xi[0]<=xi[1]||!i)||Math.sign(1/xi[0])==-1)*gy), d[1], yi*ar+(xi[1]=Math.abs(xi[0]))]).forEach(([dot, c, p],_,a)=>{
            D.places.forEach(x=>{c&x[0]&&dot.addConnection(a.find(n=>n[2]==p+x[1](ar))?.[0])}) 
            dotGroup.push(dot)
        })
        return dotGroup
    }

    updateText(text) {
        // can be optimised
        super.clear()
        this._text = text
        super.add(this.createText())
    }

    updateGaps(gaps) {
        super.clear()
        this._gaps = gaps
        super.add(this.createText())
    }

    updateLetterSpacing(ls) {
        super.clear()
        this._letterSpacing = ls
        super.add(this.createText())
    }

    updatefont(font) {
        super.clear()
        this._font = font
        super.add(this.createText())
    }

    get text() {return this._text}
	get gaps() {return this._gaps}
	get letterSpacing() {return this._letterSpacing}
	get font() {return this._font}

	set text(_text) {return this._text = _text}
	set gaps(_gaps) {return this._gaps = _gaps}
	set letterSpacing(_letterSpacing) {return this._letterSpacing = _letterSpacing}
	set font(_font) {return this._font = _font}
}