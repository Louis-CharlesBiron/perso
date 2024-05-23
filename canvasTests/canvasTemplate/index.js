// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||             
                               window.msRequestAnimationFrame;


let ctx = cvs.getContext("2d", {})
ctx.imageSmoothingEnabled = false
ctx.lineWidth = 3
ctx.fillStyle = ctx.stokeStule = "aliceblue"


function updateCvsSize(fw, fh) {
    cvs.width = fw??window.innerWidth-20
    cvs.height = fh??cvs.width/2
}updateCvsSize(500, 500)

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

