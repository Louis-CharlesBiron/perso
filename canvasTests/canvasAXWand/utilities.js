let CIRC = 2*Math.PI, DEFAULT_COLOR = "aliceblue", DEFAULT_RADIUS = 5, ACCEPTABLEDIF = 0.0000001, MINDIF = 1

function random(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min
}

class FPSCounter {
    constructor() {
        this.t = []
        
    }

    getFps() {//run in the loop
        let n=performance.now()
        while (this.t.length>0 && this.t[0]<=n-1000) this.t.shift()
        return this.t.push(n)
    }
}

function getLinearABFn(pts) {
    let a = (pts[1][1]-pts[0][1])/(pts[1][0]-pts[0][0]), b = -(a*pts[0][0]-pts[0][1])
    return [a, b, (x)=>a*x+b]
}

function toRad(deg) {
    return deg*(Math.PI/180)
}

function toDeg(rad) {
    return rad/(Math.PI/180)
}

Array.prototype.last=function(){return this[this.length-1]}

function getAcceptableDif(num, okDif) {
    return Math.round(num)-num <= okDif ? Math.round(num) : num
}

const hex = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]
function getRandomColor(format) {
    return (format == "rgb") ? "rgb("+random(0,255)+" "+random(0,255)+" "+random(0,255)+")" : "#"+new Array(6).fill().map(()=>hex[random(0,15)]).join("")
}

// (++) | (-+)
// ==== + ====
// (+-) | (--)
