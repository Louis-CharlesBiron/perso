const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, document.querySelector("#holder"), DEFAULT_CTX_SETTINGS, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
    mouseSpeed.textContent = cvs?.mouse?.currentSpeed?.toFixed(2)+" px/sec"
    mouseAngle.textContent = cvs?.mouse?.dir?.toFixed(2)+" deg"
})

// DECLARE OBJS
 let test = new Shape([
     new Dot(100, 100),
     new Dot(120, 100),
     new Dot(140, 100),
     new Dot(160, 100),
     new Dot(180, 100),
     new Dot(200, 100),
 ], DEFAULT_RADIUS, DEFAULT_RGBA, 100, (ctx, dot, ratio, dist)=>{
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

cvs.add({[Shape.childrenPath]:test})


// USER ACTIONS
function mousemovements(m) {
    mouseInfo.textContent = "("+m.x+", "+m.y+")"
    cvs.refs.forEach(el=>el.ratioPos=[m.x,m.y])
}
cvs.setmousemove(m=>{
    mousemovements(m)
})
cvs.setmouseleave(m=>{
    mousemovements(m)
})
cvs.setmousedown()
cvs.setmouseup()

// START
cvs.startLoop()

