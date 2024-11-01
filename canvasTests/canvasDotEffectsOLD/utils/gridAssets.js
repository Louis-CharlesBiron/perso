const D = [["t","-ar"],["r",1],["b","ar"],["l",-1],["tr","1-ar"],["br","ar+1"],["bl","ar-1"],["tl","-ar-1"]].reduce((a,[b,d],i)=>(a.places.push([a[b]=1<<i,(ar)=>new Function("ar",`return ${d}`)(ar)]),a),{places:[]})


const fontSource5x5 = {
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