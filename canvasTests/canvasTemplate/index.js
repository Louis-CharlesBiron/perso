const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 500, 500, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

let obj = new Obj(cvs.ctx, "dot", 50, 50, 35, "red")

cvs.els.push(obj)

// START
cvs.startLoop()