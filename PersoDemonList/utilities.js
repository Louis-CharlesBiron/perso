// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

const wday_bank = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
month_bank = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
featureLevels = ["no rate", "rate", "featured", "epic", "legendary", "mythic"]

function pad0(num) {return (num	< 10) ? '0'+ num : num}

function getDateFormated() {
    let d = new Date()
    return `${pad0(d.getFullYear())}-${pad0(d.getMonth()+1)}-${pad0(d.getDate())}`
}

function random(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min
}

function daysBetweenDates(d1, d2=new Date().getTime()) {
    return Math.floor(Math.abs(d1-d2)/86400000)
}

function msToTime(ms=0) {// y:0, d:1, h:2, m:3, s:4, ms:5
    return [365.2422,24,60,60,1000].reduce((a, b, i)=>(a.push((a[i]%1)*b),a),[ms/1000/60/60/24/365.2422]).map(x=>x>>0)
}

Element.prototype.num_input_opt = function num_input_opt(invalids, replaceElementValue, min, max) {// valids = "1234567890-+.e"
    let v = this.value
    min = (isNaN(min)) ? Number(this.min) : Number(min),
    max = (isNaN(max)) ? Number(this.max) : Number(max)
    v = v.replaceAll(new RegExp("(["+invalids+"])+","gi"), "")
    if (v !== "") v = (v < min) ? min : (v > max) ? max : v
    if (replaceElementValue) {
        this.onblur=()=>{
            if (v == "") this.value = min
            if (typeof this.oninput == "function") this.oninput()
        }
        this.value = v
    }
    return v
}

Element.prototype.input_opt = function(chars, charstate, replaceElementValue) {// chars(the characters to check), charstate(whether the characters are valid or invalid), replaceElementValue(if defined, will replace the element value and this arg value is the default value)
    let new_v = this.value.replaceAll(new RegExp("(["+((charstate=="valid") ? "^" : "")+chars+"])+","g"), "")
    if (replaceElementValue !== null && replaceElementValue !== false) {
        this.onblur=()=>{
            if (this.value == "") this.value = replaceElementValue
            if (typeof this.oninput == "function") this.oninput()
        }
        this.value = new_v
    }
    return new_v
}

Number.prototype.numSep = String.prototype.numSep = function(){
    return (this+"").split("").reduce((a, b)=>{return b+a}).split("").reduce((x, y, i)=>{return y+(i%3==0?",":"")+x})
}

function hardReset() {
    chrome.storage.sync.clear()
    chrome.storage.sync.set({
        $a:1,
        $bd:[]
    })
}

function r() {
    chrome.storage.sync.get((r)=>{console.log(r)})
}