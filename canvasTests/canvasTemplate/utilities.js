const CIRC = 2*Math.PI

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