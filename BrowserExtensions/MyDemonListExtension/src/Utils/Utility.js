const MAIN_SONGS_ID = [500476, 522654, 523561, 49854, 404997, 485351, 168734, 529148, 291458, 516735, 505816, 350290, 479319, 790341, 368392, 568699, 230308, 472925, 641172, 503731, 860287, 1284388]


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
    return asValues ? inps.reduce((a, b) => (a[b[0]] = b[1].value, a), {}) : inps.map(x => x[1])
}

function pad0(num) {return num< 10?"0"+num:num}

function getFormatedDate(msDate) {
    let d = msDate ? new Date(msDate) : new Date()
    return `${pad0(d.getFullYear())}-${pad0(d.getMonth()+1)}-${pad0(d.getDate())}`
}

// returns an custom Object instance as a plain JS object 
function getFormatedObject(obj) {
    return Object.keys(obj).map(x => x.replace("_", "")).reduce((a, b) => (a[b] = obj[b], a), {})
}

export {capitalize, getFormatedObject, getUsedInputs, getFormatedDate, pad0, MAIN_SONGS_ID}
