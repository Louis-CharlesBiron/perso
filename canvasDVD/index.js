// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||             
                               window.msRequestAnimationFrame;


let ctx = cvs.getContext("2d")
ctx.imageSmoothingEnabled = false
ctx.lineWidth = 3


function updateCvsSize(fw, fh) {
    cvs.width = fw??window.innerWidth-20
    cvs.height = fh??cvs.width/2
    cvs.height = (cvs.width = window.innerWidth-20)/2
}updateCvsSize()

// init
let ball = new Ball(10, 10, 10, 10, "aliceblue", 1)
    ball.draw()
    ball.onCollision=()=>{
        ball.color = get_random_color()
    }


move.onclick=()=>{
    ball.setFunction(-1)
    if (!isLoop) {
        isLoop = true
        window.requestAnimationFrame(loop)
    }
}

stopb.onclick=()=>{
    ball.stop()
}

resumeb.onclick=()=>{
    ball.resume()
}

resetb.onclick=()=>{
    ball.reset()
}


let t=[], fps, avgFps, isLoop //loop things

function loop() {
    ball.move()
    ball.draw()

    document.querySelector("title").textContent = ball.toString()

    //not my script
    let n=performance.now();while(t.length>0&&t[0]<=n-1000){t.shift()};t.push(n);fpsd.textContent=(fps=t.length)+" fps"
    if (!avgFps) {
        avgFps=60
        setTimeout(()=>{avgFps=fps-1},1000)
    }

    window.requestAnimationFrame(loop)
}


