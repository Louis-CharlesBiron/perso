window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let ctx = cvs.getContext("2d", {})
ctx.clearRect(0, 0, cvs.width, cvs.height)
ctx.imageSmoothingEnabled = false
ctx.globalCompositeOperation = "source-over"
ctx.lineWidth = 3
ctx.globalAlpha = 1
ctx.fillStyle = ctx.strokeStyle = "aliceblue"


function updateCvsSize(fw, fh) {
    cvs.width = fw??window.innerWidth-20
    cvs.height = fh??cvs.width/2
}updateCvsSize(window.innerWidth-5, window.innerHeight-5)

// init
//MAZE CREATION PROPS
let maze_width = 134,//134
    maze_height = 86,//86
    maze_startPXx = 10,
    maze_startPYx = 20,
    // 5=small | 10=big small | 25=complex | 50=big | 100=big comfort
    // -1      | -0           | -0         | -0     | -0
    // -2      | -1           | -1         | -0     | -0
    maze_radius = 25 //HERE!!!

// ("AUTO" FILL)
    maze_width =  (cvs.width /maze_radius/2-   0   )|0
    maze_height = (cvs.height/maze_radius/2-   1   )|0

// MAZE CREATION
let maze = new Maze(maze_width, maze_height, maze_startPXx, maze_startPYx, maze_radius)

// MAZE BUILD PROPS
let maze_startPos = null,
    maze_minLength = 0,
    maze_maxLength = Infinity,
    maze_guidanceForce = 2
// MAZE BUILD
maze.build(maze_startPos, maze_minLength, maze_maxLength, maze_guidanceForce)

// PLAYER
let player_speed = 125,
    player_size = 1+(maze_radius/2)|0

let player = new Player(player_speed, player_size)


// SET PLAYER POS
player.position = maze.path.startPos

// DRAW LOOP
function loop(timestamp) {
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    maze.draw(ctx)

    player.draw(ctx, timestamp)

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

// Create on click
cvs.onclick=(e)=>{
    if (at && e.ctrlKey) maze.reset([at.x, at.y])
}

// maze info (props)
mazeProps.textContent = `MAZE: START[${maze.path.startPos[0]},${maze.path.startPos[1]}], - END[${maze.path.endPos[0]},${maze.path.endPos[1]}], - LENGTH:${maze.path.lastPositions.length}, - SIZE: ${maze.width} x ${maze.height}`
























//Cliquez Oui à la question admin