const fpsCounter = new FPSCounter(), cvsINDEX = new Canvas(canvas, document.querySelector("#holder"), DEFAULT_CTX_SETTINGS, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
    mouseSpeed.textContent = cvsINDEX?.mouse?.currentSpeed?.toFixed(2)+" px/sec"
    mouseAngle.textContent = cvsINDEX?.mouse?.dir?.toFixed(2)+" deg"
})

// DECLARE OBJS
 let test = new Shape([
     new Dot(100, 100),
     new Dot(120, 100),
     new Dot(140, 100),
     new Dot(160, 100),
     new Dot(180, 100),
     new Dot(200, 100),
 ], DEFAULT_RADIUS, DEFAULT_RGBA, 100, (ctx, dot, ratio)=>{
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

let adot = new Dot(300, 300)
cvsINDEX.add(adot, true)

cvsINDEX.add({[Shape.childrenPath]:test})


// USER ACTIONS
function mousemovements(m) {
    mouseInfo.textContent = "("+m.x+", "+m.y+")"
    cvsINDEX.refs.forEach(el=>el.ratioPos=[m.x,m.y])
}
cvsINDEX.setmousemove(m=>{
    mousemovements(m)
})
cvsINDEX.setmouseleave(m=>{
    mousemovements(m)
})
cvsINDEX.setmousedown()
cvsINDEX.setmouseup()

// START
cvsINDEX.startLoop()

