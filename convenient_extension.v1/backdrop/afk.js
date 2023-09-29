// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

const draw = "draw", erase = "erase", line = "line", big = "big"

let cvs = document.getElementById("cvs"), title = document.querySelector("title"),
    ctx = cvs.getContext("2d"),
    x, y, ox, oy, itd, w = 3, mode = "draw", modeList = ["draw", "erase", "line", "big"], kb = {draw:"d",erase:"e",clear:"c",line:"l",kb_draw:["a", " "], big:"b"}, kba = Object.values(kb)
    
ctx.imageSmoothingEnabled = false

function updateColor(color) {
    ctx.fillStyle = ctx.strokeStyle = color||cvs.style.color
    ctx.lineWidth = w
}
updateColor()

function updateSize() {
    cvs.width = window.innerWidth
    cvs.height = window.innerWidth/2
    updateColor()
}updateSize()

document.onkeydown=(e)=>{
    let k = e.key.toLowerCase()
    if (k == kb.draw) mode = draw
    else if (k == kb.erase) mode = erase
    else if (k == kb.line) mode = line
    else if (k == kb.big) mode = big
    else if (k == kb.clear && e.altKey) {
        updateColor("black")
        ctx.fillRect(0, 0, cvs.width, cvs.height)
        updateColor()
    }
    if (kb.kb_draw.includes(k) && !itd) start()
    
    if (kba.includes(k) && !kb.kb_draw.includes(k)) displayMode()
}

document.onkeyup=(e)=>{
    let k = e.key.toLowerCase()
    if (kb.kb_draw.includes(k)) end()
}

function displayMode() {
    title.textContent = "Current Mode: "+mode
    setTimeout(()=>{title.textContent = "AFK"},1200)
}

function start() {
    w = -1
    clearInterval(itd)
    itd = setInterval(modeList[mode])
}
function end() {
    clearInterval(itd)
    itd = null
    if (mode !== "line") ox = null, oy = null    
}

cvs.onmousemove=(e)=>{
    x = e.x-(w/2)+5, y = e.y-(w/2)+5  
}

cvs.onmousedown=start
cvs.onmouseup=end
cvs.oncontextmenu=end

modeList[draw] = function() {
    if (w !== 3) {
        ox = null, oy = null
        w = 3
        updateColor()
    }

    if (ox && oy) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(ox, oy)
        ctx.stroke()
    } else ctx.fillRect(x, y, w, w)
    ox = x
    oy = y
}

modeList[erase] = function() {
    if (w !== 30) {
        updateColor("black")
        w = 30
    }
    ctx.fillRect(x, y, w, w)
}

modeList[big] = function() {
    if (w !== 35) {
        updateColor()
        w = 35
    }
    ctx.fillRect(x, y, w, w)
}

modeList[line] = function() {
    if (w !== 3) {
        updateColor()
        w = 3
    }
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(ox||x, oy||y)
    ctx.stroke()
    ox = x
    oy = y
}


