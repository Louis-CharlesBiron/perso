const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 600, 600, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

//let source = new Source(cvs.ctx, cvs.width-100, cvs.height-100, 120, 1, DEFAULT_RADIUS, "cyan"),
let source = new Source(cvs.ctx, 285, 170, 120, 1, DEFAULT_RADIUS, "cyan"),
obstacles = [
    new Obs(cvs.ctx, [0,0], [cvs.width,0], DEFAULT_COLOR),// border top
    new Obs(cvs.ctx, [0,cvs.height], [cvs.width,cvs.height], DEFAULT_COLOR),// border bottom
    new Obs(cvs.ctx, [0,0], [0,cvs.height], DEFAULT_COLOR),// border left
    new Obs(cvs.ctx, [cvs.width,0], [cvs.width,cvs.height], DEFAULT_COLOR),// border right

    new Obs(cvs.ctx, [100,100], [350, 100], DEFAULT_COLOR),
    new Obs(cvs.ctx, [50,450], [290, 150], DEFAULT_COLOR),
    new Obs(cvs.ctx, [450,50], [150, 290], DEFAULT_COLOR),
    new Obs(cvs.ctx, [400,500], [400, 350], DEFAULT_COLOR),
    new Obs(cvs.ctx, [50,500], [50, 35], DEFAULT_COLOR),
]

cvs.els.push(source)
cvs.els.push(...obstacles)

// START
cvs.startLoop()

let mouse = {} 
canvas.onmousemove=e=>{
    mouseInfo.textContent = "("+e.x+", "+e.y+")"

    let deg = (-Math.atan2(source.y+source.radius/2-e.y, (source.x+source.radius/2-e.x))*180/Math.PI)+180
    mouseDeg.textContent = deg.toFixed(1)+" deg"

    mouse = {x:e.x, y:e.y, deg:deg}
}

canvas.onclick=()=>{
    let c=source.getReflectPos(mouse.deg)
    if (c) cvs.els.push(new Reflect(cvs.ctx, source, c.x, c.y, 3, "red"))
}