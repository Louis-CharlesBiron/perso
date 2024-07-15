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