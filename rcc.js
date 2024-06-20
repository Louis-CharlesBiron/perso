function toJSON(str) {
    return JSON.parse(str.replaceAll("'",'"').replaceAll(/['", {]{1}[a-z]+['", ]?:/gi, x=>`${x.match(/^({|,)/g)?.[0]??""}"${x.match(/[a-z0-9]+/gi)}":`))
}

function setValueInput(v) {
    valueInput.value = JSON.stringify(toJSON(v), null, 3)
    valueInput.style.height = valueInput.scrollHeight<250 ? valueInput.scrollHeight+"px" : "250px"
    valueInput.style.width = valueInput.scrollWidth<250 ? valueInput.scrollWidth+"px" : "250px"
}