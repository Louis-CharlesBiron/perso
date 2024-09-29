// JS
// Canvas Dot Effects by Louis-Charles Biron
// Please don't use or credit this code as your own.
//


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

Array.prototype.last=function(){return this[this.length-1]}

function getDist(x1, y1, x2, y2) {
    return Math.sqrt((x1-x2)**2 + (y1-y2)**2)
}

function mod(max, ratio, range) {
    range??=max
    return max-ratio*range+max*((range>=0)-1)
}

function formatColor(rgba) {
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
}

function toRad(deg) {
    return deg*(Math.PI/180)
}

function toDeg(rad) {
    return rad/(Math.PI/180)
}