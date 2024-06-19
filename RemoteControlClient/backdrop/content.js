chrome.runtime.onMessage.addListener(m => {
    console.log(m)
    if (m.type == "command") commandManager(m)
})

function send(m) {
    chrome.runtime.sendMessage(m)
}

function toJSON(str) {
    return JSON.parse(str.replaceAll(/['", {]{1}[a-z]+['", ]?:/gi, x=>`${x.startsWith("{")?"{":""}"${x.match(/[a-z0-9]+/gi)}":`))
}

// COMMANDS
function commandManager(m) {
    let c = m.command.trim().toLowerCase()
    try {
        if (c == "test") console.log("test:", m.value)
        else if (c.includes("clipboard")) clipboard(m)
        else if (c.includes("style")) style(m)
        else if (c.includes("html")) html(m)
    } catch (err) {
        send({type:"response", isError:true, value:err.toString(), responseTarget:m.responseTarget})
    }
}

function clipboard(m) {
    let c = m.command.trim().toLowerCase()
    if (c.includes("get") || c.includes("read")) send({type:"response", command:c, value:navigator.clipboard.readText(), responseTarget:m.responseTarget})
    if (c.includes("set") || c.includes("write")) {
        navigator.clipboard.writeText(m.value)
        send({type:"response", command:c, value:"Clipboard value is now set to: "+m.value, responseTarget:m.responseTarget})
    }
}
function style(m) {// {selector:"", css:"", activation:?"", id:""}
    let c = m.command.trim().toLowerCase()
    if (c.includes("create")) {
        let v = toJSON(m.value),
        css = v.selector+(v.activation||"")+"{"+v.css+"}",
        style = document.createElement("style")
        style.id = v.id
    
        if (style.styleSheet) style.styleSheet.cssText = css
        else style.appendChild(document.createTextNode(css))
        document.querySelector(v.selector).appendChild(style)
        
        send({type:"response", command:c, value:"New style appended, id: "+v.id, responseTarget:m.responseTarget})
    } else if (c.includes("remove")) {
        document.querySelector("style"+m.value).remove()
        send({type:"response", command:c, value:"Removed style with id: "+m.value, responseTarget:m.responseTarget})
    }
}

function html(m) {// {tag:"", html:"", selector:"", prepend:false}
    let c = m.command.trim().toLowerCase()
    if (c.includes("get")) send({type:"response", command:c, value:document.documentElement.outerHTML, responseTarget:m.responseTarget})
    else if (c.includes("create")) {
        let v = toJSON(m.value),
        newEl = document.createElement(v.tag)
        newEl.innerHTML = v.html
        if (v.prepend) document.querySelector(v.selector).prependChild(newEl)
        else document.querySelector(v.selector).appendChild(newEl)
        send({type:"response", command:c, value:"New element <"+v.tag+"> added to: "+v.selector, responseTarget:m.responseTarget})
    } else if (c.includes("remove")) {
        document.querySelector(m.value).remove()
        send({type:"response", command:c, value:"Removed element: "+m.value, responseTarget:m.responseTarget})
    }
}