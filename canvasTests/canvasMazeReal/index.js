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
}updateCvsSize(1500, 1000)

// init

//let maze = new Maze(36, 70, 10, 40, 5)
let maze = new Maze(6, 6, 10, 40, 25)
maze.build()

function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    maze.draw(ctx)

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)


// mouse
let poss = maze.postitions.flatMap(x=>x), at
cvs.onmousemove=e=>{
    mouseInfo.textContent = "("+e.x+", "+e.y+")"
    at = poss.filter(p=>e.x>=p.dx&&e.x<=p.dx+p.r*2 && e.y>=p.dy&&e.y<=p.dy+p.r*2)[0]
    mazeInfo.textContent = at ? `AT: ${at?.type} [${at?.x}, ${at?.y}], walls:[${at?.walls[0]},${at?.walls[1]},${at?.walls[2]},${at?.walls[3]}]` : ""
}

cvs.onclick=()=>{
    if (at) maze.reset([at.x, at.y])
}
























