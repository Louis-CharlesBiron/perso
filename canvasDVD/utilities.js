function random(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min
}

const hex = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]
function get_random_color(format) {
    return (format == "rgb") ? "rgb("+random(0,255)+" "+random(0,255)+" "+random(0,255)+")" : "#"+new Array(6).fill().map(x=>hex[random(0,15)]).join("")
}