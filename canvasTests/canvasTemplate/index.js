const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 500, 500, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

let obj = new Obj(50, 50, DEFAULT_RADIUS, DEFAULT_COLOR)

cvs.add(obj)

// START
cvs.startLoop()