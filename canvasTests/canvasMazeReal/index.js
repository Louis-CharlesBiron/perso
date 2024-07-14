window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let ctx = cvs.getContext("2d", {})
ctx.clearRect(0, 0, cvs.width, cvs.height)
ctx.imageSmoothingEnabled = false
ctx.globalCompositeOperation = 'source-over'
ctx.lineWidth = 3
ctx.globalAlpha = 1
ctx.fillStyle = ctx.strokeStyle = "aliceblue"


function updateCvsSize(fw, fh) {
    cvs.width = fw??window.innerWidth-20
    cvs.height = fh??cvs.width/2
}updateCvsSize(500, 500)

// init

let maze = new Maze(5, 6, 100, 100, 25)
maze.build()



























// let dots = []
// for (let i=0,x=50,y=50;i<75;i++) {
//     x = x+TOTAL>cvs.width ? (y+=TOTAL,x=0) : x+TOTAL
//     dots.push(new Dot(x, y, [1, 0, 0, 1]))
// } 

// let isLoop, stopLoop
// function loop() {
//     ctx.clearRect(0, 0, cvs.width, cvs.height)
//     dots.forEach(d=>d.draw())

//     if (!stopLoop) window.requestAnimationFrame(loop)
// }

// function startLoop() {
//     if (!isLoop || stopLoop) {
//         isLoop = true
//         stopLoop = false
//         window.requestAnimationFrame(loop)
//     }
// }startLoop()

