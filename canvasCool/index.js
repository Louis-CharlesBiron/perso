// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
window.requestAnimationFrame = window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame

let DEFAULT_RADIUS = 5,
DEFAULT_RANGE = 100,
DEFAULT_COLOR = "rgb(240 248 255)",
DEFAULT_SHOWRANGES = false,
DEFAULT_SPEED = 1

const ctx = cvs.getContext("2d")
ctx.imageSmoothingEnabled = false
ctx.lineWidth = 3

function updateCvsSize(fw, fh) {
    cvs.width = fw??(Math.min(window.innerWidth-20, 1000))
    cvs.height = fh??cvs.width/2
}updateCvsSize(1500, 500)


// init
let dots = [], mouse, isLoop = false, stopLoop = false

cvs.onmousemove=(e=>{
    mouse = {x:e.x, y:e.y, mouse:true}
})

cvs.onmouseout=(e=>{
    mouse = null
})

// buttons
test.onclick=()=>{
    dots = [new Dot(100, 100, 5, "aliceblue", 100, true)]//
    startLoop()
}

start.onclick=()=>{
    dots = []
    let v = num.value.match(/[0-9]+/g)
    v = v.length>1 ? random(+v[0], +v[1]) : v

    for (let i=0;i<v;i++) {
        dots.push(new Dot(random(5, cvs.width-5), random(5, cvs.height-5), DEFAULT_RADIUS, DEFAULT_COLOR, DEFAULT_RANGE, DEFAULT_SHOWRANGES, DEFAULT_SPEED))
    }
    
    startLoop()
}

cvs.onclick=(e)=>{
    dots.push(new Dot(e.x, e.y, DEFAULT_RADIUS, DEFAULT_COLOR, DEFAULT_RANGE, DEFAULT_SHOWRANGES, DEFAULT_SPEED))
    startLoop()
}

cvs.oncontextmenu=(e)=>{
    e.preventDefault()
}

reset.onclick=()=>{
    stopLoop = true
    dots = []
    loop()
}

toggleRanges.oninput=()=>{
    DEFAULT_SHOWRANGES = toggleRanges.value
    dots.forEach((d)=>{
        d.showRange = DEFAULT_SHOWRANGES
    })
}

setRange.oninput=()=>{
    DEFAULT_RANGE = +setRange.value
    dots.forEach((d)=>{
        d.range = DEFAULT_RANGE
    })
    setRangeDisplay.textContent = setRange.value
}

setSpeed.oninput=()=>{
    DEFAULT_SPEED = +setSpeed.value
    dots.forEach((d)=>{
        d.speed = DEFAULT_SPEED
    })
    setSpeedDisplay.textContent = setSpeed.value
}

lol.onclick=()=>{
    dots = [new Dot(119, 105),new Dot(120, 200),new Dot(120, 292),new Dot(117, 378),new Dot(206, 377),new Dot(299, 375),new Dot(516, 81),new Dot(444, 105),new Dot(428, 185),new Dot(424, 263),new Dot(460, 351),new Dot(529, 368),new Dot(593, 331),new Dot(619, 268),new Dot(604, 205),new Dot(576, 119),new Dot(761, 83),new Dot(761, 173),new Dot(763, 264),new Dot(765, 356),new Dot(853, 354),new Dot(911, 356)]
    startLoop()
}

document.onkeydown=(e)=>{
    if (e.key.toLowerCase() == "z" && e.ctrlKey) dots = dots.slice(0, dots.length-1)
}

// anims
let t=[] //fps things

function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    dots.forEach((el)=>{
        el.draw()
        el.drawConnections()
        el.move()
    })

    //not my script
    let n=performance.now();while(t.length>0&&t[0]<=n-1000){t.shift()};t.push(n);fps.textContent=t.length+" fps"
    

    if (!stopLoop) window.requestAnimationFrame(loop)
}

function startLoop() {
    if (!isLoop || stopLoop) {
        isLoop = true
        stopLoop = false
        window.requestAnimationFrame(loop)
    }
}

//slow interval
setInterval(()=>{
    count.textContent = `(${dots.length})`
})


