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

let maze = new Maze(5, 6, 50, 50, 25)
maze.build(0, 3, [3, 2])

function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    maze.draw(ctx)

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)


// mouse
cvs.onmousemove=e=>mouseInfo.textContent = "("+e.x+", "+e.y+")"
























