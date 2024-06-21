function toJSON(str) {
    return str?JSON.parse(str.replaceAll("'",'"').replaceAll(/['", {]{1}[a-z]+['", ]?:/gi, x=>`${x.match(/^({|,)/g)?.[0]??""}"${x.match(/[a-z0-9]+/gi)}":`)):""
}

function setValueInput(v) {
    let dv=0
    try {valueInput.value = dv = toJSON(v) ? JSON.stringify(toJSON(v), null, 3) : ""}
    catch {valueInput.value = v}

    valueInput.style.height = valueInput.style.width = "auto"
    valueInput.style.height = valueInput.scrollHeight<250 ? valueInput.scrollHeight-4+"px" : "250px"
    valueInput.style.width = valueInput.scrollWidth<450 ? valueInput.scrollWidth+(dv&&200)+"px" : "250px"
}

function setCommandInput(v) {
    commandInput.value = v

    commandInput.style.width = "auto"
    commandInput.style.width = commandInput.scrollWidth<250 ? commandInput.scrollWidth+"px" : "250px"
}

document.querySelectorAll(".cmd_name, .valueTemplates > span, .sub_cmd").forEach(el=>{
    el.onclick=()=>{
        setCommandInput(el.getAttribute("c")??"")
        setValueInput(el.getAttribute("v")??"")
    }
})