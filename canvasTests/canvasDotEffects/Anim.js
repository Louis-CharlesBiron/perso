let animIdGiver = 0
class Anim {
    constructor(animation, duration, easing, endCallback) {
        this._id = animIdGiver++                    //the main animation ()=>{}
        this._animation = animation                 //the main animation ()=>{}
        this._duration = duration??1000             //duration in ms
        this._easing = easing||Anim.easeInOutQuad   //easing function ()=>{}
        this._endCallback = endCallback             //function called when animation is over

        this._startTime = null                      //start time
        this._progress = 0                          //animation progress
        this._hasEnded = false                      //if animation has ended
    }

    getFrame(time) {//run in loop
        if (!this._hasEnded) {
            // SET START TIME
            if (!this._startTime) this._startTime = time
            // PLAY ANIMATION
            else if (time<this._startTime+this._duration) this._animation(this._progress = this._easing((time-this._startTime)/this._duration))
            // END
            else this.end()
        }
    }

    end() {
        this._hasEnded = true
        if (typeof this._endCallback == "function") this._endCallback()
    }

    reset() {
        this._progress = 0
        this._hasEnded = false
        this._startTime = null
    }

    get id() {return this._id}
    get animation() {return this._animation}
	get duration() {return this._duration}
	get easing() {return this._easing}
	get endCallback() {return this._endCallback}
	get startTime() {return this._startTime}
	get progress() {return this._progress}
	get hasEnded() {return this._hasEnded}

	set animation(_animation) {return this._animation = _animation}
	set duration(_duration) {return this._duration = _duration}
	set easing(_easing) {return this._easing = _easing}
	set endCallback(_endCallback) {return this._endCallback = _endCallback}


    static get easeInOutQuad() {
        return (x)=>x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
    }

    static get easeOutQuad() {
        return (x)=>1 - (1 - x) * (1 - x)
    }
}