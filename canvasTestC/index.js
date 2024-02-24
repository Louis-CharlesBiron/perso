// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||             
                               window.msRequestAnimationFrame;


let ctx = cvs.getContext("2d", {willReadFrequently:true})
ctx.imageSmoothingEnabled = false
ctx.lineWidth = 3

let ctx2 = cvs2.getContext("2d", {willReadFrequently:true})
ctx2.imageSmoothingEnabled = false
ctx2.lineWidth = 3

//
const DEFAULT_COLOR = new Color([240, 248, 255], ctx,ctx2)

function updateCvsSize(fw, fh) {
    cvs.width = fw??window.innerWidth-20
    cvs.height = fh??cvs.width/2
}updateCvsSize(800, 300)

function updateCvsSize2(fw, fh) {
    cvs2.width = fw??window.innerWidth-20
    cvs2.height = fh??cvs.width/2
}updateCvsSize2(800, 300)

// init
let isLoop = false, stopLoop = false,
mouse = {},//test
red = new Color([255,0,0],ctx,ctx2),//test
green = new Color([0,255,0],ctx,ctx2),//test
blue = new Color([0,0,255],ctx,ctx2)//test

//let a = new Color([228, 228, 228], ctx, ctx2) / white

let d1 = new Color([20, 90, 50], ctx, ctx2) // green
//let d2 = new Color([160, 170, 108], ctx, ctx2) // yellow
let d3 = new Color([0, 85, 125], ctx, ctx2) // blue
function loop() {
    // ctx.fillStyle = ctx.strokeStyle = c1.toString()//test
    // ctx.fillRect(50, 50, 20, 20)//test
    // ctx.fillStyle = ctx.strokeStyle = c2.toString()//test
    // ctx.fillRect(80, 50, 20, 20)//test
    // ctx.fillStyle = ctx.strokeStyle = c3.toString()//test
    // ctx.fillRect(110, 50, 20, 20)//test
    // ctx.fillStyle = ctx.strokeStyle = c1.toString()//test
    // ctx.fillRect(140, 50, 20, 20)//test

    // ctx.fillStyle = ctx.strokeStyle = red.toString()//test
    // ctx.fillRect(200, 100, 20, 20)//test
    // ctx.fillStyle = ctx.strokeStyle = green.toString()//test
    // ctx.fillRect(170, 100, 20, 20)//test
    // ctx.fillStyle = ctx.strokeStyle = blue.toString()//test
    // ctx.fillRect(230, 100, 20, 20)//test

    // ctx.fillStyle = ctx.strokeStyle = red.toString()//test
    // ctx.fillRect(200, 250, 20, 20)//test
    // ctx.fillStyle = ctx.strokeStyle = green.toString()//test
    // ctx.fillRect(170, 250, 20, 20)//test
    // ctx.fillStyle = ctx.strokeStyle = blue.toString()//test
    // ctx.fillRect(230, 250, 20, 20)//test

    // if (mouse) {
    //     ctx.fillStyle = get_random_color("rgb")//test
    //     ctx.fillRect(mouse.x, mouse.y, 5, 5)//test
    //     DEFAULT_COLOR.draw()//test
    //     red.draw()//test
    //     green.draw()//test
    //     blue.draw()//test
    // }

    ctx2.clearRect(0, 0, cvs2.width, cvs2.height)


    d1.draw(20)
    //d2.draw(10)
    //d3.draw(10)
    
    if (!stopLoop) window.requestAnimationFrame(loop)
}


function startLoop() {
    if (!isLoop || stopLoop) {
        isLoop = true
        stopLoop = false
        window.requestAnimationFrame(loop)
    }
}

let c1 = new Color([240, 248, 255], ctx),//test
    c2 = new Color([230, 238, 245], ctx),//test
    c3 = new Color([210, 218, 225], ctx)//test


cvs.onmousemove=(e)=>{
    mouse = {x:e.x, y:e.y}
    mouseinfo.textContent = `x:${e.x} y:${e.y}`

}

start.onclick=()=>{
    startLoop()
    playCamera(ctx.canvas, 800, 300)
}

clear.onclick=()=>{
    ctx2.clearRect(0, 0, cvs2.width, cvs2.height)
}

setAbs.onclick=()=>{
    cvs2.className = cvs2.className == "abs" ? "" : "abs"
}
setAbs.onclick()
start.click()