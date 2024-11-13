// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.

const MAIN_SONGS_ID = [500476, 522654, 523561, 49854, 404997, 485351, 168734, 529148, 291458, 516735, 505816, 350290, 479319, 790341, 368392, 568699, 230308, 472925, 641172, 503731, 860287, 1284388],
      DEMON_TYPES = ["easy", "medium", "hard", "insane", "extreme"],
      EMPTY_STATS1 = {easy:0,medium:0,hard:0,insane:0,extreme:0,weekly:0,gauntlet:0},
      FEATURE_LEVELS = ["no rate", "rate", "featured", "epic", "legendary", "mythic"],
      DISABLED_MESSAGE = "WARNING: you currently have unsaved changes, please save or revert them to access this feature",
      MAX_USERNAME_LL = 18

function capitalize(str) {
    return str.replaceAll(/(?:\s|^)[a-z]/g,x=>x.toUpperCase())
}

/**
 * Returns used inputs from Object list
 * @param {Object} inputs: as such {date:HTML_ELEMENT, id:HTML_ELEMENT, creator:HTML_ELEMENT,...}
 * @param {boolean} asValues if true, returns a Object list with the values instead of the elements: {date:"2024-11-04", id:1231231, creator:"nameidk",...}
 * @returns an array of all inputs with a defined value
 */
function getUsedInputs(inputs, asValues) {
    let inps = Object.entries(inputs).filter(x => x[1]?.value), dateIndex = inps.findIndex(x => x[0] == "date")
    if (dateIndex + 1) inps[dateIndex][1] = { value: new Date(inps[dateIndex][1].value + " 00:00").getTime() }
    return asValues ? inps.reduce((a, b) => (a[b[0]] = b[1].value.trim(), a), {}) : inps.map(x => x[1])
}

function pad0(num) {return num< 10?"0"+num:num}

function getFormatedDate(msDate=Date.now()) {
    let d = new Date(msDate)
    return d.getFullYear()+"-"+(pad0(d.getMonth()+1))+"-"+pad0(d.getDate())
}

// adds commas between numbers, ex: 10000 -> 10,000
function numSep(num) {
    return [...num+""].toReversed().reduce((x, y, i)=>{return y+(!!i&&i%3==0?",":"")+x},"")
}

// returns an custom Object instance as a plain JS object 
function getFormatedObject(obj) {
    return Object.keys(obj).map(x => x.replace("_", "")).reduce((a, b) => (a[b] = obj[b], a), {})
}

// returns array value of index starting from the right
Array.prototype.last=function(index=0){return this[this.length-1-index]}

/**
 * Converts miliseconds into how many additive (years + days + hours + minutes + seconds + miliseconds) time format
 * @param {Number} ms: miliseconds 
 * @returns an array containing the number of [years, days, hours, minutes, seconds, miliseconds)]
 */
function msToTime(ms=0) {// y:0, d:1, h:2, m:3, s:4, ms:5
    return [365.2422,24,60,60,1000].reduce((a, b, i)=>(a.push((a[i]%1)*b),a),[ms/1000/60/60/24/365.2422]).map(x=>x>>0)
}

function daysBetweenDates(d1, d2=Date.now()) {
    return Math.floor(Math.abs(d1-d2)/86400000)
}

// 5:00 -> 300
function getLengthInSeconds(lengthStr) {
    return lengthStr?.match(/[0-9]{1,2}/g)?.reduce((a,b,i)=>a+=i?+b:b*60,0)||0
}

function random(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min
}

function readFile(file, callback) {// callback(file, content)
    let fr = new FileReader()
    fr.onload=e=>callback(file, e.target.result)
    fr.readAsText(file)
}

function isValidJson(str) {try{JSON.parse(str)}catch(e){return 0}return 1}


function getByteSize(obj={}) {
    return new TextEncoder().encode(JSON.stringify(obj)).length
}



export {capitalize, random, getByteSize, isValidJson, readFile, getFormatedObject, getUsedInputs, getFormatedDate, pad0, numSep, msToTime, daysBetweenDates, getLengthInSeconds, MAIN_SONGS_ID, DEMON_TYPES, EMPTY_STATS1, FEATURE_LEVELS, DISABLED_MESSAGE, MAX_USERNAME_LL}
