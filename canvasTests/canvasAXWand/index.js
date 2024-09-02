const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 600, 600, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

let source = new Source(cvs.ctx, cvs.width-100, cvs.height-100, 120, 1, DEFAULT_RADIUS, "cyan"), obstacles = [
    new Obs(cvs.ctx, [0,0], [cvs.width,0], "lime"),// border top
    new Obs(cvs.ctx, [0,cvs.height], [cvs.width,cvs.height], "lime"),// border bottom
    new Obs(cvs.ctx, [0,0], [0,cvs.height], "lime"),// border left
    new Obs(cvs.ctx, [cvs.width,0], [cvs.width,cvs.height], "lime"),// border right
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
    if (c) cvs.els.push(new Reflect(cvs.ctx, c[0], c[1], 3, "red"))
}