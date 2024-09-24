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




//  let h0 = 100, h0pad = 40, h1 = 200, h1pad = 50, h2 = 310, h2pad = 45
//  let test = new Shape("o", DEFAULT_RADIUS, DEFAULT_RGBA, 100, (ctx, dot, ratio, dist)=>{
//     if (dot.parent.dots.length==1) {
//         let defaultList = []
//         for (let i=0;i<cvs.width;i+=dot.radius*random(15, 35)) defaultList.push(new Dot(i>cvs.width?cvs.width:i, cvs.height-random(h0-h0pad, h0)))
//         for (let i=0;i<cvs.width;i+=dot.radius*random(15, 35)) defaultList.push(new Dot(i>cvs.width?cvs.width:i, cvs.height-random(h1-h1pad, h1)))
//         for (let i=0;i<cvs.width;i+=dot.radius*random(15, 35)) defaultList.push(new Dot(i>cvs.width?cvs.width:i, cvs.height-random(h2-h2pad, h2)))
//         dot.parent.clear()
//         dot.parent.add(defaultList)
//     }


//     dot.a = mod(1, ratio, 0.8)

//     let {r,g,b} = dot.parent
//     ctx.strokeStyle = formatColor([r, g, b, 0.5])
//     let h0NextDot = dot.parent.dots.find(x=>x.id==dot.id+1 && ((dot.y >= cvs.height-h0 && dot.y <= cvs.height-(h0-h0pad) && x.y >= cvs.height-h0 && x.y <= cvs.height-(h0-h0pad)) || (dot.y >= cvs.height-h1 && dot.y <= cvs.height-(h1-h1pad) && x.y >= cvs.height-h1 && x.y <= cvs.height-(h1-h1pad)) || (dot.y >= cvs.height-h2 && dot.y <= cvs.height-(h2-h2pad) && x.y >= cvs.height-h2 && x.y <= cvs.height-(h2-h2pad)))) ?? {x:cvs.width, y:dot.y-10}
//     ctx.beginPath()
//     ctx.moveTo(dot.x, dot.y)
//     ctx.lineTo(h0NextDot.x, h0NextDot.y)
//     ctx.stroke()
    

//  })
function ground(height, heightRange, radius=DEFAULT_RADIUS, rgba=DEFAULT_RGBA, lineA=0.5, limit=100) {
    return new Shape("o", radius, rgba, limit, (ctx, dot, ratio, dist)=>{
        if (dot.parent.dots.length==1) {
            let defaultList = []
            for (let i=0;i<cvs.width;i+=dot.radius*random(15, 35)) defaultList.push(new Dot(i>cvs.width?cvs.width:i, cvs.height-random(height-heightRange, height)))
            dot.parent.clear()
            dot.parent.add(defaultList)
        }
     
        dot.a = mod(1, ratio, 0.5)
     
        let {r,g,b} = dot.parent
        ctx.strokeStyle = formatColor([r, g, b, lineA])
        let h0NextDot = dot.parent.dots.find(x=>x.id==dot.id+1) ?? {x:cvs.width, y:dot.y-10}
        ctx.beginPath()
        ctx.moveTo(dot.x, dot.y)
        ctx.lineTo(h0NextDot.x, h0NextDot.y)
        ctx.stroke()
     })
}

function linearShape(dots, maxConnections, radius=DEFAULT_RADIUS, rgba=DEFAULT_RGBA, lineA=0.4, limit=100) {
    return new Shape(dots, radius, rgba, limit, (ctx, dot, ratio, dist)=>{
        dot.a = mod(1, ratio, 0.5)
    
        let {r,g,b} = dot.parent
        ctx.strokeStyle = formatColor([r,b,g,lineA])
        dot.parent.dots.filter(x=>x.id!==dot.id).toSorted((a,b)=>getDist(dot.x, dot.y, a.x, a.y)-getDist(dot.x, dot.y, b.x, b.y)).slice(0,maxConnections).forEach(x=>{
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(x.x, x.y)
            ctx.stroke()
        })
    })
}


let linearShapes = [
    linearShape([new Dot(580,59),new Dot(433,243),new Dot(477,266),new Dot(612,88),new Dot(530,268),new Dot(627,131),new Dot(622,177),new Dot(573,251),new Dot(608,216),new Dot(494,232),new Dot(585,108),new Dot(532,217),new Dot(574,155),new Dot(558,188),], 4),//MOON
    linearShape([new Dot(68,46), new Dot(92,88), new Dot(114,120), new Dot(152,98)], 1),//L
    linearShape([new Dot(260,31), new Dot(220,27), new Dot(215,66), new Dot(207,104), new Dot(254,106)], 1),//C
    linearShape([new Dot(342,45), new Dot(320,78), new Dot(305,110), new Dot(334,126),new Dot(376,66)], 2),//B
    linearShape([new Dot(122,391),new Dot(205,363),new Dot(297,359),new Dot(327,278),new Dot(413,311),new Dot(384,386)], 2, 3, [255,255,255,0.5], 0.1),//CONSTELLATION 
]
let grounds = [[100,40],[200,50],[310,45]].reduce((a,b,i)=>(a.push(ground(b[0], b[1], 4, [100+i*100,100+i*100,100+i*100, 1], 0.5)),a),[])


// ADD TO CANVAS
grounds.forEach(g=>cvs.add({"dots":g}, true))
linearShapes.forEach(g=>cvs.add({"dots":g}, true))

// USER ACTIONS
cvs.setmousemove(m=>{
    mouseInfo.textContent = "("+m.x+", "+m.y+")"
    cvs.els.refs.forEach(r=>r.dots.ratioPos= [m.x, m.y])
})

cvs.setmouseleave(m=>{
    mouseInfo.textContent = "("+m.x+", "+m.y+")"
    cvs.els.refs.forEach(r=>r.dots.ratioPos= [Infinity, Infinity])
})

cvs.cvs.onclick=e=>{
    cvs.add(new Dot(e.x, e.y))
}

cvs.cvs.oncontextmenu=e=>{
    e.preventDefault()
    cvs.els.def = cvs.els.def.slice(0,cvs.els.def.length-1)
}

// START
cvs.startLoop()

