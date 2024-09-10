const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 650, 800, ()=>{
    //looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

//let source = new Source(cvs.ctx, cvs.width-100, cvs.height-100, 120, 1, DEFAULT_RADIUS, "cyan"),
let source = new Source(200, 250, 30, 1, DEFAULT_RADIUS, "cyan"),
obstacles = [
    new Obs([0,0], [cvs.width,0], DEFAULT_COLOR),// border top
    new Obs([0,cvs.height], [cvs.width,cvs.height], DEFAULT_COLOR),// border bottom
    new Obs([0,0], [0,cvs.height], DEFAULT_COLOR),// border left
    new Obs([cvs.width,0], [cvs.width,cvs.height], DEFAULT_COLOR),// border right

    new Obs([100,150], [10, 450], DEFAULT_COLOR),
    new Obs([100,655], [600, 700], DEFAULT_COLOR),
    new Obs([210,355], [500, 400], DEFAULT_COLOR),
    new Obs([300,150], [400, 350], DEFAULT_COLOR),

]

cvs.add(source)
cvs.add(obstacles)

// START
cvs.startLoop()

let mouse = {} 
canvas.onmousemove=e=>{
    mouseInfo.textContent = "("+e.x+", "+e.y+")"

    let deg = (-Math.atan2(source.y+source.radius/2-e.y, (source.x+source.radius/2-e.x))*180/Math.PI)+180
    mouseDeg.textContent = deg.toFixed(1)+" deg"

    mouse = {x:e.x, y:e.y, deg}
}

canvas.onclick=()=>{
    source.initDeg = mouse.deg
    source.reflect()
}

document.oncontextmenu=document.onkeydown=e=>{
    let k = e?.key?.toLowerCase()
    if (!k || k == "a") {
        e.preventDefault()
        source.reflect(1)
    }
}

//source.reflect()