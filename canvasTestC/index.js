// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
let DEFAULT_COLOR = new Color([240, 248, 255])

window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||             
                               window.msRequestAnimationFrame;


let ctx = cvs.getContext("2d", {willReadFrequently:true})
ctx.imageSmoothingEnabled = false
ctx.lineWidth = 3

function updateCvsSize(fw, fh) {
    cvs.width = fw??window.innerWidth-20
    cvs.height = fh??cvs.width/2
}updateCvsSize(1000, 500)

// init
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

ctx.fillStyle = ctx.strokeStyle = "aliceblue"
ctx.fillRect(800, 300, 900, 400)
