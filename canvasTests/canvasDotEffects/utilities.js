// JS
// Canvas Dot Effects by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
const ACCEPTABLE_DIF = 0.0000001

function random(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min
}

class FPSCounter {
    constructor(avgSampleSize) {
        this._t = []
        this._maxFps=0
        this._avgSampleSize = avgSampleSize||10
        this._avg = []
    }

    getFpsRaw() {//run in the loop
        let n=performance.now(), fps
        while (this._t.length>0 && this._t[0]<=n-1000) this._t.shift()
        fps = this._t.push(n)
        if (this._maxFps < fps) this._maxFps = fps
        return fps
    }

    getFps() {//or run in the loop
        this._avg.push(this.getFpsRaw())
        if (this._avg.length > this._avgSampleSize) this._avg.shift()
        return Math.floor(this._avg.reduce((a, b)=>a+b,0)/this._avgSampleSize)
    }

    get maxFps() {return this._maxFps-1}
    get avgSample() {return this._avgSampleSize}
    set avgSample(s) {this._avgSampleSize = s}
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

function getAcceptableDif(n, okDif) {
    return Math.round(n)-n <= okDif ? Math.round(n) : n
}




function addForce(el, force, dir, time, easing) {
    let rDir = toRad(dir), steps = 165, calcSteps = time/steps, {x, y} = el,
        dx = getAcceptableDif(force*Math.cos(rDir), ACCEPTABLE_DIF),
        dy = getAcceptableDif(force*Math.sin(rDir), ACCEPTABLE_DIF)

        for (let i=0;i<=steps;i++) {
            let prog = easing(i/steps)
            
            setTimeout(()=>{
                el.x = x+dx*prog
                el.y = y-dy*prog
            }, calcSteps*i)
        }
    
}
function ease(x) {
    return 1 - Math.pow(1 - x, 5);
}
//addForce(adot, 100, 90, 1000, ease)