const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 800, 800, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

// DECLARE OBJS
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
}, (ctx, dot)=>{
    ctx.strokeStyle = formatColor([255,255,255,0.2])
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.radius*5, 0, CIRC)
    ctx.stroke()
    ctx.closePath()

    //ctx.beginPath();
    //ctx.arc(dot.x, dot.y, dot.radius*10, 0, Math.PI*2, true)
    //ctx.moveTo(dot.x+35, dot.y)
    //ctx.arc(dot.x, dot.y, dot.radius*7, 0, Math.PI, false)
    //ctx.moveTo(dot.x-10, dot.y-10)
    //ctx.arc(dot.x-15, dot.y-10, dot.radius, 0, Math.PI*2, true)
    //ctx.moveTo(dot.x+20, dot.y-10)
    //ctx.arc(dot.x+15, dot.y-10, dot.radius, 0, Math.PI*2, true)
    //ctx.stroke()
})

let drawTestThing = new Shape("test2", null, 5, DEFAULT_RGBA, 150, (dot, ratio)=>{
    dot.a = mod(1, ratio, 0.9)
    dot.radius = mod(DEFAULT_RADIUS, ratio, DEFAULT_RADIUS*0.5)
}, (ctx, dot)=>{
    ctx.strokeStyle = formatColor([dot.r, dot.g, dot.b, mod(0.2, dot.ratio, 0.2)])
    ctx.beginPath()
    ctx.moveTo(dot.x, dot.y)
    ctx.lineTo(mouse.x, mouse.y)
    ctx.stroke()


})

drawTestThing.create(`
   o     o     o   
  o o   o o   o o  
 o   o o   o o   o 
o     o     o     o
`, [150, 250], [15, 25])

// ADD TO CANVAS
cvs.add({"dots":test}, true)
cvs.add({"dots":drawTestThing}, true)

// USER ACTIONS
let mouse = {} 
document.onmousemove=e=>{
    mouseInfo.textContent = "("+e.x+", "+e.y+")"
    mouse = {x:e.x, y:e.y}


    test.updateEffect([mouse.x, mouse.y])
    drawTestThing.updateEffect([mouse.x, mouse.y])
}

document.onmouseleave=()=>{
    mouse = {x:Infinity, y:Infinity}
    mouseInfo.textContent = "("+mouse.x+", "+mouse.y+")"
    drawTestThing.updateEffect([mouse.x, mouse.y])
}

// START
cvs.startLoop()