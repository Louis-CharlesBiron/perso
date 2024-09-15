const fpsCounter = new FPSCounter(), cvs = new Canvas(canvas, DEFAULT_CTX_SETTINGS, 650, 800, ()=>{//looping
    fpsDisplay.textContent = fpsCounter.getFps()
})

function onCollision(i, r, s) {
    //r.color = getRandomColor()
}
const randPad = 5
let source = new Source(onCollision, 200, 250, 30, SOURCE_DEFAULT_RADIUS, "cyan"),
obstacles = [
    new Obs([0,0], [cvs.width,0]),// border top
    new Obs([0,cvs.height], [cvs.width,cvs.height]),// border bottom
    new Obs([0,0], [0,cvs.height]),// border left
    new Obs([cvs.width,0], [cvs.width,cvs.height]),// border right

    //new Obs([100,150], [10, 450]),
    //new Obs([100,655], [600, 700]),
    //new Obs([210,355], [500, 400]),
    //new Obs([300,150], [400, 350]),
    //new Obs([random(randPad, cvs.width-randPad),random(randPad, cvs.height-randPad)], [random(randPad, cvs.width-randPad), random(randPad, cvs.height-randPad)]),
    //new Obs([random(randPad, cvs.width-randPad),random(randPad, cvs.height-randPad)], [random(randPad, cvs.width-randPad), random(randPad, cvs.height-randPad)]),
    //new Obs([random(randPad, cvs.width-randPad),random(randPad, cvs.height-randPad)], [random(randPad, cvs.width-randPad), random(randPad, cvs.height-randPad)]),
    //new Obs([random(randPad, cvs.width-randPad),random(randPad, cvs.height-randPad)], [random(randPad, cvs.width-randPad), random(randPad, cvs.height-randPad)]),
    //new Obs([random(randPad, cvs.width-randPad),random(randPad, cvs.height-randPad)], [random(randPad, cvs.width-randPad), random(randPad, cvs.height-randPad)]),

    new Obs([43, 144], [463, 624]),
    new Obs([181, 492], [510, 372]),
    new Obs([597, 643], [294, 147]),
]

cvs.add(source)
cvs.add({"reflects":source}, true)
cvs.add(obstacles)

// START
cvs.startLoop()

let mouse = {} 
canvas.onmousemove=e=>{
    mouseInfo.textContent = "("+e.x+", "+e.y+")"

    let deg = (-Math.atan2(source.y+source.radius/2-e.y, (source.x+source.radius/2-e.x))*180/Math.PI)+180
    mouseDeg.textContent = deg.toFixed(1)+" deg"

    mouse = {x:e.x, y:e.y, deg}

    if (e.altKey) {
        source.move(mouse.x, mouse.y)
    }
}

canvas.onclick=()=>{
    source.initDeg = mouse.deg
    source.reflect()
}

document.onkeydown=e=>{
    let k = e?.key?.toLowerCase()
    if (!k || k == "a") {
        e.preventDefault()
        source.reflect(1)
    }
}

document.oncontextmenu=e=>{
    e.preventDefault()
    source.move(mouse.x, mouse.y)
}
