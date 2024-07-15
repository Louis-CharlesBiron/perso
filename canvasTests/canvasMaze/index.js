// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


let ctx = cvs.getContext("2d", {})
ctx.imageSmoothingEnabled = false
ctx.lineWidth = 3
ctx.fillStyle = ctx.stokeStyle = "aliceblue"


function updateCvsSize(fw, fh) {
    cvs.width = fw??window.innerWidth-20
    cvs.height = fh??cvs.width/2
}updateCvsSize(500, 500)

// init
let dots = [], rowWidth = 10, startX = TOTAL/2, startY = TOTAL/2
for (let i=0,x=startX,y=startY;i<100;i++) {
    if (i) x = !(i%rowWidth) ? (y+=TOTAL,x=startX) : x+TOTAL
    let asdasd = [random(0,1),random(0,1),random(0,1),random(0,1)]
    dots.push(new Dot(x, y, asdasd))
} 

let isLoop, stopLoop
function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    dots.forEach(d=>d.draw())

    if (!stopLoop) window.requestAnimationFrame(loop)
}

function startLoop() {
    if (!isLoop || stopLoop) {
        isLoop = true
        stopLoop = false
        window.requestAnimationFrame(loop)
    }
}startLoop()

