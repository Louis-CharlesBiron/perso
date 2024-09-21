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


let test = new Shape(dotsList, DEFAULT_RADIUS, DEFAULT_RGBA, 100, (ctx, dot, ratio, dist)=>{
    dot.a = mod(1, ratio, 0.8)
    //dot.r = mod(255, ratio, -255)
    //dot.g = mod(255, ratio, -255)
    
    let idk = mod(5, ratio, 5)
    dot.x += random(-idk, idk)
    dot.y += random(-idk, idk)
    dot.radius = mod(DEFAULT_RADIUS*2, ratio, DEFAULT_RADIUS*2*0.8)


    ctx.strokeStyle = formatColor([255,255,255,0.2])
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.radius*5, 0, CIRC)
    ctx.stroke()
    ctx.closePath()

})

let drawTestThing = new Shape(null, 5, DEFAULT_RGBA, 150, (ctx, dot, ratio)=>{

    dot.a = mod(1, ratio, 0.8)
    dot.radius = mod(DEFAULT_RADIUS*1.2, ratio, DEFAULT_RADIUS*0.8)

    let randColor = mod(225, ratio), {r,g,b,a}=dot.parent
    dot.rgba = [r+random(-randColor, randColor),g+random(-randColor, randColor),b+random(-randColor, randColor),a]

    ctx.strokeStyle = formatColor([r+random(-randColor, randColor),g+random(-randColor, randColor),b+random(-randColor, randColor), mod(0.5, ratio, 0.5)])
    ctx.beginPath()
    ctx.moveTo(dot.x, dot.y)
    ctx.lineTo(mouse.x, mouse.y)
    ctx.stroke()

    ctx.strokeStyle = formatColor([r+random(-randColor, randColor),g+random(-randColor, randColor),b+random(-randColor, randColor), mod(0.1, ratio, 0.1)])
    dot.parent.dots.filter(x=>x.id!==dot.id).toSorted((a,b)=>getDist(dot.x, dot.y, a.x, a.y)-getDist(dot.x, dot.y, b.x, b.y)).slice(0,2).forEach(x=>{
        ctx.beginPath()
        ctx.moveTo(dot.x, dot.y)
        ctx.lineTo(x.x, x.y)
        ctx.stroke()
    })


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


    test.ratioPos = [mouse.x, mouse.y]
    drawTestThing.ratioPos = [mouse.x, mouse.y]
}

document.onmouseleave=()=>{
    mouse = {x:Infinity, y:Infinity}
    mouseInfo.textContent = "("+mouse.x+", "+mouse.y+")"
    
    test.ratioPos = [mouse.x, mouse.y]
    drawTestThing.ratioPos = [mouse.x, mouse.y]
}

// START
cvs.startLoop()