const fpsCounter = new FPSCounter(), cvsINDEX = new Canvas(canvas, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
    mouseSpeed.textContent = cvsINDEX?.mouse?.speed?.toFixed(2)+" px/sec"
    mouseAngle.textContent = cvsINDEX?.mouse?.dir?.toFixed(2)+" deg"
})

// DECLARE OBJS
 let test = new Shape([500,500],[
     new Dot(450, 450),
     new Dot(450, 500),
     new Dot(450, 550),
     new Dot(500, 450),
     new Dot(550, 450),
     new Dot(550, 500),
     new Dot(550, 550),
     new Dot(500, 550),
 ], DEFAULT_RADIUS, DEFAULT_RGBA, 100, (ctx, dot, ratio)=>{
     dot.a = mod(1, ratio, 0.8)
     //dot.r = mod(255, ratio, -255)
     //dot.g = mod(255, ratio, -255)
    
     //let idk = mod(5, ratio, 5)
     //dot.x += random(-idk, idk)
     //dot.y += random(-idk, idk)
     dot.radius = mod(DEFAULT_RADIUS*2, ratio, DEFAULT_RADIUS*2*0.8)

     ctx.strokeStyle = formatColor([255,255,255,0.2])
     ctx.beginPath()
     ctx.arc(dot.x, dot.y, dot.radius*5, 0, CIRC)
     ctx.stroke()
     ctx.closePath()

})
toggleCenter(test)

let mouseup = false, adotShapeAnim
let adotShape = new Shape([10,10],[new Dot(10,10)], null, null, null, (ctx, dot, ratio, m, dist)=>{

    dot.radius = mod(DEFAULT_RADIUS*2, ratio, DEFAULT_RADIUS*2*0.5)

    ctx.strokeStyle = formatColor([255,255,255,mod(0.3, ratio)])
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.radius*3, 0, CIRC)
    ctx.stroke()

    // drag
    if (m.clicked && dist < 50) {
        mouseup = true
        if (dot?.currentAnim?.id == adotShapeAnim?.id && adotShapeAnim) adotShapeAnim.end()
        dot.x = m.x
        dot.y = m.y
    } else if (mouseup) {
        mouseup = false
        adotShapeAnim = dot.addForce(Math.min(mod(m.speed, ratio)/4, 300), m.dir, 750+ratio*1000, Anim.easeOutQuad)
    }
})

let le = new Grid("abcdefg\nhijklm\nnopqrs\ntuvwxyz", [5, 5], 50, null, [10,200], 2, null, null, (ctx, dot, ratio, m, dist)=>{
    dot.radius = mod(DEFAULT_RADIUS, ratio, DEFAULT_RADIUS)
    if (dist < 200) {
        ctx.strokeStyle = formatColor([dot.r,dot.g,dot.b,mod(0.1, ratio)])
            ctx.beginPath()
            ctx.moveTo(m.x, m.y)
            ctx.lineTo(dot.x, dot.y)
            ctx.stroke()
   }

   ctx.globalCompositeOperation = "destination-over"
   if (dot.connections.length) dot.connections.forEach(c=>{
        ctx.strokeStyle = formatColor([255,0,0,1])
        ctx.beginPath()
        ctx.moveTo(dot._x, dot._y)
        ctx.lineTo(c.x, c.y)
        ctx.stroke()
    })
    ctx.globalCompositeOperation = "source-over"
}, null)


cvsINDEX.add({[Shape.childrenPath]:adotShape})
cvsINDEX.add({[Shape.childrenPath]:test})
cvsINDEX.add(le.asSource())

// USER ACTIONS
cvsINDEX.setmousemove(m=>{
    mouseInfo.textContent = "("+m.x+", "+m.y+")"
})
cvsINDEX.setmouseleave(m=>{
    mouseInfo.textContent = "("+m.x+", "+m.y+")"
})
cvsINDEX.setmousedown()
cvsINDEX.setmouseup()

// START
cvsINDEX.startLoop()

