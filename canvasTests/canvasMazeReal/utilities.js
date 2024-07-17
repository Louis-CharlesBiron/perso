function random(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min
}

function equals(arr1, arr2) {
    return arr1.length == arr2.length && arr1.every((x, i) => x === arr2[i]);
}

function dot(x, y, r=3, c="lime") {
    ctx.fillStyle = ctx.strokeStyle = c

    ctx.beginPath()
    ctx.arc(x, y, r, 0, C)
    ctx.fill()

    ctx.fillStyle = ctx.strokeStyle = DEFAULT_COLOR
}

function rgbIterator(rgb, index=0, increment=20, min=100, max=255, formated) {
    let v = rgb[index]
    if (v + increment > max) rgb[index] = max-increment
    else rgb[index]+=increment
    return formated ? `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})` : rgb
}

function test(x, y) {
    for (let i=0;i<4;i++) {
        let pos = maze.getPosition(x, y)
        pos.walls = [0,0,0,0]
        if(i==0)setTimeout(()=>{console.log("top");pos.walls = [1,0,0,0]},500*(i+1))
        if(i==1)setTimeout(()=>{console.log("right");pos.walls = [1,1,0,0]},500*(i+1))
        if(i==2)setTimeout(()=>{console.log("bottom");pos.walls = [1,1,1,0]},500*(i+1))
        if(i==3)setTimeout(()=>{console.log("left");pos.walls = [1,1,1,1]},500*(i+1))
    }   
}
