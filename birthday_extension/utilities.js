// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

const MSYEAR = 31536000000

let month_bankEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
wday_bankEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let month_bankFR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
wday_bankFR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

function msToTime(ms=0) {// y:0, d:1, h:2, m:3, s:4, ms:5
    return [365.2422,24,60,60,1000].reduce((a, b, i)=>(a.push((a[i]%1)*b),a),[ms/1000/60/60/24/365.2422]).map(x=>x>>0)
}

function typeWriter(txt, speed, el) {
    [...txt].reduce((s, b)=>{
        setTimeout(()=>{el.textContent += b},s)
        return s+speed
    }, speed)
}

function p(v) {
    return (v>1) ? "s" : ""
}