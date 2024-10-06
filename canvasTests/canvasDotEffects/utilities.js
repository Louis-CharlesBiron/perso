// JS
// Canvas Dot Effects by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
const ACCEPTABLE_DIF = 0.0000001

function random(min, max, decimals=0) {
    return +(Math.random()*(max-min)+min).toFixed(decimals)
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

const alphabet5 = {
    width:5,
    height:5,
    A: "  o  \n o o \nooooo\no   o\no   o",
    B: "oooo \no   o\noooo \no   o\noooo ",
    C: " oooo\no    \no    \no    \n oooo",
    D: "oooo \no   o\no   o\no   o\noooo ",
    E: "ooooo\no    \noooo \no    \nooooo",
    F: "ooooo\no    \noooo \no    \no    ",
    G: " oooo\no    \no  oo\no   o\n oooo",
    H: "o   o\no   o\nooooo\no   o\no   o",
    I: " ooo \n  o  \n  o  \n  o  \n ooo ",
    J: "  ooo\n   o \n   o \no  o \n oo  ",
    K: "o   o\no  o \nooo  \no  o \no   o",
    L: "o    \no    \no    \no    \nooooo",
    M: "o   o\noo oo\no o o\no   o\no   o",
    N: "o   o\noo  o\no o o\no  oo\no   o",
    O: " ooo \no   o\no   o\no   o\n ooo ",
    P: "oooo \no   o\noooo \no    \no    ",
    Q: " ooo \no   o\no   o\no  oo\n oooo",
    R: "oooo \no   o\noooo \no  o \no   o",
    S: " oooo\no    \n ooo \n    o\noooo ",
    T: "ooooo\n  o  \n  o  \n  o  \n  o  ",
    U: "o   o\no   o\no   o\no   o\n ooo ",
    V: "o   o\no   o\no   o\n o o \n  o  ",
    W: "o   o\no   o\no o o\noo oo\no   o",
    X: "o   o\n o o \n  o  \n o o \no   o",
    Y: "o   o\n o o \n  o  \n  o  \n  o  ",
    Z: "ooooo\n   o \n  o  \n o   \nooooo"
  }
  