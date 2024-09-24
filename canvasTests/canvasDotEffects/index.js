const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 800, 800, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

// DECLARE OBJS
// let dotsList = [
//     new Dot(100, 100),
//     new Dot(120, 100),
//     new Dot(140, 100),
//     new Dot(160, 100),
//     new Dot(180, 100),
//     new Dot(200, 100),
// ]


// let test = new Shape(dotsList, DEFAULT_RADIUS, DEFAULT_RGBA, 100, (ctx, dot, ratio, dist)=>{
//     dot.a = mod(1, ratio, 0.8)
//     //dot.r = mod(255, ratio, -255)
//     //dot.g = mod(255, ratio, -255)
    
//     let idk = mod(5, ratio, 5)
//     dot.x += random(-idk, idk)
//     dot.y += random(-idk, idk)
//     dot.radius = mod(DEFAULT_RADIUS*2, ratio, DEFAULT_RADIUS*2*0.8)


//     ctx.strokeStyle = formatColor([255,255,255,0.2])
//     ctx.beginPath()
//     ctx.arc(dot.x, dot.y, dot.radius*5, 0, CIRC)
//     ctx.stroke()
//     ctx.closePath()

// })

// let drawTestThing = new Shape(null, 5, DEFAULT_RGBA, 150, (ctx, dot, ratio)=>{

//     dot.a = mod(1, ratio, 0.8)
//     dot.radius = mod(DEFAULT_RADIUS*1.2, ratio, DEFAULT_RADIUS*0.8)

//     let randColor = mod(225, ratio), {r,g,b,a}=dot.parent
//     dot.rgba = [r+random(-randColor, randColor),g+random(-randColor, randColor),b+random(-randColor, randColor),a]

//     ctx.strokeStyle = formatColor([r+random(-randColor, randColor),g+random(-randColor, randColor),b+random(-randColor, randColor), mod(0.5, ratio, 0.5)])
//     ctx.beginPath()
//     ctx.moveTo(dot.x, dot.y)
//     ctx.lineTo(cvs.mouse.x, cvs.mouse.y)
//     ctx.stroke()

//     ctx.strokeStyle = formatColor([r+random(-randColor, randColor),g+random(-randColor, randColor),b+random(-randColor, randColor), mod(0.1, ratio, 0.1)])
//     dot.parent.dots.filter(x=>x.id!==dot.id).toSorted((a,b)=>getDist(dot.x, dot.y, a.x, a.y)-getDist(dot.x, dot.y, b.x, b.y)).slice(0,2).forEach(x=>{
//         ctx.beginPath()
//         ctx.moveTo(dot.x, dot.y)
//         ctx.lineTo(x.x, x.y)
//         ctx.stroke()
//     })


// })

// drawTestThing.create(`
//    o     o     o   
//   o o   o o   o o  
//  o   o o   o o   o 
// o     o     o     o
// `, [150, 250], [15, 25])

function ground(height, heightRange, radius=DEFAULT_RADIUS, rgba=DEFAULT_RGBA, lineA=0.5, limit=100) {
    return new Shape("o", radius, rgba, limit, (ctx, dot, ratio, dist)=>{
        let m = cvs.mouse
        if (dot.parent.dots.length==1) {
            let defaultList = []
            for (let i=0;i<cvs.width;i+=dot.radius*random(15, 35)) {
                let d = new Dot(i>cvs.width?cvs.width:i, cvs.height-random(height-heightRange, height))
                d.initPos = [d.x, d.y]
                defaultList.push(d)
            }
            dot.parent.clear()
            dot.parent.add(defaultList)
            return;
        }
     
        let {r,g,b,a} = dot.parent, randColor = mod(height, ratio)
        dot.rgba = [r+random(-randColor, randColor),g+random(-randColor, randColor),b+random(-randColor, randColor),lineA]
        dot.a = mod(0.8, ratio, 0.45)

        let initDist = getDist(dot.x, dot.y, dot.initPos[0], dot.initPos[1]), dragRad = 100
        if (m.clicked && getDist(m.x, m.y, dot.initPos[0], dot.initPos[1]) < dragRad-dot.radius) {
            let c = dot.parent.dots.toSorted((a,b)=>getDist(m.x, m.y, a.x, a.y)-getDist(m.x, m.y, b.x, b.y))[0]
            // small outer
            ctx.strokeStyle = formatColor([c.r,c.g,c.b,mod(0.5, initDist/dragRad)])
            ctx.beginPath()
            ctx.arc(c.x, c.y, c.radius*3, 0, CIRC)
            ctx.stroke()
            ctx.closePath()

            // big outer
            ctx.strokeStyle = formatColor([c.r,c.g,c.b,mod(-0.15, initDist/dragRad)])
            ctx.beginPath()
            ctx.arc(c.initPos[0], c.initPos[1], dragRad, 0, CIRC)
            ctx.stroke()
            ctx.closePath()
            
            let dr = mod(1, initDist/dragRad, 1), dirX = Math.sign(m.x-c.x), dirY = Math.sign(m.y-c.y)
            c.x += dr*dirX
            c.y += dr*dirY
        } else if (initDist >= 1 && initDist <= dragRad+dot.radius) {
            let dr = mod(1, initDist/dragRad, 1), dirX = Math.sign(dot.initPos[0]-dot.x), dirY = Math.sign(dot.initPos[1]-dot.y)
            dot.x += dr*dirX
            dot.y += dr*dirY
        } else {
            dot.x = dot.initPos[0]
            dot.y = dot.initPos[1]
        }

        dot.radius = mod(DEFAULT_RADIUS*1.2, ratio, DEFAULT_RADIUS*0.8)

        ctx.strokeStyle = formatColor([r+random(-randColor, randColor),g+random(-randColor, randColor),b+random(-randColor, randColor), mod(lineA, ratio, lineA/2)])
        let h0NextDot = dot.parent.dots.find(x=>x.id==dot.id+1) ?? {x:cvs.width, y:dot.y-10}
        ctx.beginPath()
        ctx.moveTo(dot.x, dot.y)
        ctx.lineTo(h0NextDot.x, h0NextDot.y)
        ctx.stroke()
     })
}

function linearShape(dots, maxConnections, radius=DEFAULT_RADIUS, rgba=DEFAULT_RGBA, lineA=0.4, limit=100) {
    return new Shape(dots, radius, rgba, limit, (ctx, dot, ratio, dist)=>{
        let m = cvs.mouse
        dot.a = mod(rgba[3], ratio, rgba[3]/2)
    
        let {r,g,b} = dot.parent

        dot.radius = mod(DEFAULT_RADIUS*1.2, ratio, DEFAULT_RADIUS*0.6)

        ctx.strokeStyle = formatColor([r,g,b,mod(lineA, ratio, lineA/3)])
        dot.parent.dots.filter(x=>x.id!==dot.id).toSorted((a,b)=>getDist(dot.x, dot.y, a.x, a.y)-getDist(dot.x, dot.y, b.x, b.y)).slice(0,maxConnections).forEach(x=>{
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(x.x, x.y)
            ctx.stroke()
        })

        if (dist < 200) {
            ctx.strokeStyle = formatColor([r,g,b,mod(lineA/2, ratio)])
            dot.parent.dots.toSorted((a,b)=>getDist(m.x, m.y, a.x, a.y)-getDist(m.x, m.y, b.x, b.y)).slice(0,random(1, maxConnections*2)).forEach(x=>{
                ctx.beginPath()
                ctx.moveTo(m.x, m.y)
                ctx.lineTo(x.x, x.y)
                ctx.stroke()
            })
        }
    })
}

let star_speedX = 30, star_speedY = -3, star_height = 510, star_maxConn = 2, star_a = 0.15
let stars = new Shape(Array((cvs.width/15)>>0).fill().map(x=>new Dot(random(0, cvs.width), random(0, star_height))), 2, [255,255,255,star_a], 400, (ctx, dot, ratio)=>{
    // movements
    dot.x += star_speedX * cvs.deltaTime * random(0, 3)
    dot.y += star_speedY * cvs.deltaTime * random(0, 3)
    if (dot.x-dot.radius-star_speedX > cvs.width || dot.y-dot.radius < 0) {
        dot.x = -dot.parent.radius*3+random(-20,0)
        dot.y = random(0, star_height)
    }

    //connect
    ctx.strokeStyle = formatColor([dot.r,dot.g,dot.b,mod(star_a, ratio, star_a/2)])
    dot.parent.dots.filter(x=>x.id!==dot.id).toSorted((a,b)=>getDist(dot.x, dot.y, a.x, a.y)-getDist(dot.x, dot.y, b.x, b.y)).slice(0,random(0,star_maxConn)).forEach(x=>{
        ctx.beginPath()
        ctx.moveTo(dot.x, dot.y)
        ctx.lineTo(x.x, x.y)
        ctx.stroke()
    })
})


let linearShapes = [
    linearShape([new Dot(580,59),new Dot(433,243),new Dot(477,266),new Dot(612,88),new Dot(530,268),new Dot(627,131),new Dot(622,177),new Dot(573,251),new Dot(608,216),new Dot(494,232),new Dot(585,108),new Dot(532,217),new Dot(574,155),new Dot(558,188),], 4),//MOON
    linearShape([new Dot(68,46), new Dot(92,88), new Dot(114,120), new Dot(152,98)], 1),//L
    linearShape([new Dot(260,31), new Dot(220,27), new Dot(215,66), new Dot(207,104), new Dot(254,106)], 1),//C
    linearShape([new Dot(342,45), new Dot(320,78), new Dot(305,110), new Dot(334,126),new Dot(376,66)], 2),//B
    linearShape([new Dot(122,391),new Dot(205,363),new Dot(297,359),new Dot(327,278),new Dot(413,311),new Dot(384,386)], 2, 3, [255,255,255,0.6], 0.15),//CONSTELLATION 
]
let grounds = [[100,40],[200,50],[310,55]].reduce((a,b,i)=>(a.push(ground(b[0], b[1], 3+i, [125+i*75,125+i*75,125+i*75, 1], 0.5, 200)),a),[])

// ADD TO CANVAS
grounds.forEach(g=>cvs.add({"dots":g}, true))
linearShapes.forEach(g=>cvs.add({"dots":g}, true))
cvs.add({"dots":stars}, true)

// USER ACTIONS
cvs.setmousemove(m=>{
    mouseInfo.textContent = "("+m.x+", "+m.y+")"
    cvs.els.refs.forEach(r=>r.dots.ratioPos= [m.x, m.y])
    cvs.mouse.x = m.x
    cvs.mouse.y = m.y
})

cvs.setmouseleave(m=>{
    mouseInfo.textContent = "("+m.x+", "+m.y+")"
    cvs.els.refs.forEach(r=>r.dots.ratioPos=[Infinity, Infinity])
    cvs.mouse = {x:Infinity, y:Infinity}
})

cvs.cvs.onmousedown=e=>{
    cvs.mouse.clicked = true
}

cvs.cvs.onmouseup=e=>{
    cvs.mouse.clicked = false
}

//cvs.cvs.onclick=e=>{
//    cvs.add(new Dot(e.x, e.y))
//}
//
//cvs.cvs.oncontextmenu=e=>{
//    e.preventDefault()
//    cvs.els.def = cvs.els.def.slice(0,cvs.els.def.length-1)
//}

// START
cvs.startLoop()

