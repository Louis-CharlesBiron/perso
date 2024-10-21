const fpsCounter = new FPSCounter(), cvsINDEX = new Canvas(canvas, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()+"\n"+fpsCounter.fpsRaw
    mouseSpeed.textContent = cvsINDEX?.mouse?.speed?.toFixed(2)+" px/sec"
    mouseAngle.textContent = cvsINDEX?.mouse?.dir?.toFixed(2)+" deg"
})

// DECLARE OBJS
 let test = new Shape([500,500],[
     new Dot([450, 450]),
     new Dot([450, 500]),
     new Dot([450, 550]),
     new Dot([500, 450]),
     new Dot([550, 450]),
     new Dot([550, 500]),
     new Dot([550, 550]),
     new Dot([500, 550]),
 ], DEFAULT_RADIUS, DEFAULT_RGBA, 100, (ctx, dot, ratio)=>{
     dot.a = mod(1, ratio, 0.8)
     //dot.r = mod(255, ratio, -255)
     //dot.g = mod(255, ratio, -255)
     //let idk = mod(5, ratio, 5)
     //dot.x += random(-idk, idk)
     //dot.y += random(-idk, idk)
     dot.radius = mod(DEFAULT_RADIUS*2, ratio, DEFAULT_RADIUS*2*0.8)
     _drawOuterRing(dot, [255,255,255,0.2], 5)
 })
toggleCenter(test)

let test2 = new Shape((shape, dots)=>{
    dots[0].addConnection(dots.last())
    dots[1].addConnection(dots.last(1))
    return [100,100]
},[new Dot((dot, shape)=>[shape.x,20]),new Dot([80,40]),new Dot([150,60]),new Dot([250,80])], DEFAULT_RADIUS, DEFAULT_RGBA, 100, (ctx, dot, ratio)=>{
    dot.a = mod(1, ratio, 0.8)
    dot.radius = mod(DEFAULT_RADIUS*2, ratio, DEFAULT_RADIUS*2*0.8)

    _drawOuterRing(dot, [255,255,255,0.2], 1.5)
    _drawDotConnections(dot, [255,0,0,mod(1, ratio, 0.8)])
})



let mouseup = false, adotShapeAnim
let adotShape = new Shape([10,10],[new Dot([10,10])], null, null, null, (ctx, dot, ratio, m, dist)=>{

    dot.radius = mod(DEFAULT_RADIUS*2, ratio, DEFAULT_RADIUS*2*0.5)

    _drawOuterRing(dot, [255,255,255,mod(0.3, ratio)], 3)

    // drag
    if (m.clicked && dist < 50) {
        mouseup = true
        if (dot?.currentAnim?.id == adotShapeAnim?.id && adotShapeAnim) adotShapeAnim.end()
        dot.x = m.x
        dot.y = m.y
    } else if (mouseup) {
        mouseup = false
        adotShapeAnim = dot.addForce(Math.min(mod(m.speed, ratio)/4, 300), m.dir, 750+ratio*1200, Anim.easeOutQuad)
    }
})

let le = new Grid("abcdefg\nhijklm\nnopqrs\ntuvwxyz", [5, 5], 50, null, [10,200], 2, null, null, (ctx, dot, ratio, m, dist)=>{
    dot.radius = mod(DEFAULT_RADIUS, ratio, DEFAULT_RADIUS)
    if (dist < 200) {
        _drawConnections(dot, [dot.r,dot.g,dot.b,mod(0.5, ratio)], dot.ratioPos)
    }

   _drawDotConnections(dot, [255,0,0,1])
}, ()=>{
    return adotShape.dots[0].pos
})


cvsINDEX.add({[Shape.childrenPath]:adotShape})
cvsINDEX.add({[Shape.childrenPath]:test})
cvsINDEX.add(le.asSource())
cvsINDEX.add(test2.asSource())

let w=400, h=50, freq=4
test2.dots.last().follow(3000, null, {0:(prog, obj, ix)=>[w*prog, Math.sin((obj.x-ix)*(Math.PI/(w/freq)))*h]}, {0.5:(prog, obj, ix)=>[w-w*prog, Math.sin((obj.x-ix)*(Math.PI/(w/freq))+Math.PI)*h]})

// USER ACTIONS
let mMove=m=>mouseInfo.textContent = "("+m.x+", "+m.y+")"
cvsINDEX.setmousemove(mMove)
cvsINDEX.setmouseleave(mMove)
cvsINDEX.setmousedown()
cvsINDEX.setmouseup()

// START
cvsINDEX.startLoop()

