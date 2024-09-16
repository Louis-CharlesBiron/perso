const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 500, 500, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

let dotsList = [
    new Dot(100, 100),
    new Dot(120, 100),
    new Dot(140, 100),
    new Dot(160, 100),
    new Dot(180, 100),
    new Dot(200, 100),
]

let test = new Shape("test", dotsList, DEFAULT_RADIUS, DEFAULT_RGBA, 100, (dot, ratio)=>{
    if (ratio) {
        dot.a = mod(1, ratio, 0.8)
        //dot.r = mod(255, ratio, -255)
        //dot.g = mod(255, ratio, -255)
    
        let idk = mod(5, ratio, 5)
        dot.x += random(-idk, idk)
        dot.y += random(-idk, idk)
    
        dot.radius = mod(DEFAULT_RADIUS*2, ratio, DEFAULT_RADIUS*2*0.8)
    }
})

cvs.add({"dots":test}, true)


// START
cvs.startLoop()

let mouse = {} 
document.onmousemove=e=>{
    mouseInfo.textContent = "("+e.x+", "+e.y+")"
    mouse = {x:e.x, y:e.y}


    test.updateEffect([mouse.x, mouse.y])
}