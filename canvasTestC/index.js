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
const DEFAULT_COLOR = new Color([240, 248, 255], ctx)

function updateCvsSize(fw, fh) {
    cvs.width = fw??window.innerWidth-20
    cvs.height = fh??cvs.width/2
}updateCvsSize(800, 300)

function updateCvsSize2(fw, fh) {
    cvs2.width = fw??window.innerWidth-20
    cvs2.height = fh??cvs.width/2
}updateCvsSize2(800, 500)

// init
let isLoop = false, stopLoop = false
function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    
    if (!stopLoop) window.requestAnimationFrame(loop)
}

function startLoop() {
    if (!isLoop || stopLoop) {
        isLoop = true
        stopLoop = false
        window.requestAnimationFrame(loop)
    }
}

let c1 = new Color([240, 248, 255], ctx),
    c2 = new Color([230, 238, 245], ctx),
    c3 = new Color([210, 218, 225], ctx)

ctx.fillStyle = ctx.strokeStyle = c1.toString()
ctx.fillRect(50, 50, 20, 20)
ctx.fillStyle = ctx.strokeStyle = c2.toString()
ctx.fillRect(80, 50, 20, 20)
ctx.fillStyle = ctx.strokeStyle = c3.toString()
ctx.fillRect(110, 50, 20, 20)
ctx.fillStyle = ctx.strokeStyle = c1.toString()
ctx.fillRect(140, 50, 20, 20)


cvs.onmousemove=(e)=>{
    mouse.textContent = `x:${e.x} y:${e.y}`
}