const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 500, 500, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

let test = new Shape("test", 50, 50, [], DEFAULT_RADIUS, DEFAULT_COLOR)
let obj = new Dot(50, 50, DEFAULT_RADIUS, DEFAULT_COLOR)

cvs.add({"dots":test}, true)

test.add([
    new Dot(50, 50, DEFAULT_RADIUS, DEFAULT_COLOR),
    new Dot(60, 50, DEFAULT_RADIUS, DEFAULT_COLOR),
    new Dot(70, 50, DEFAULT_RADIUS, DEFAULT_COLOR),
    new Dot(80, 50, DEFAULT_RADIUS, DEFAULT_COLOR),
    new Dot(90, 50, DEFAULT_RADIUS, DEFAULT_COLOR),
    new Dot(100, 50, DEFAULT_RADIUS, DEFAULT_COLOR),
])

// START
cvs.startLoop()

let mouse = {} 
document.onmousemove=e=>{
    mouseInfo.textContent = "("+e.x+", "+e.y+")"
    mouse = {x:e.x, y:e.y}


    test.updateOpacity(mouse.x, mouse.y)
}