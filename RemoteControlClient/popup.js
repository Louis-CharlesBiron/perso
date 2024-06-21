chrome.runtime.onMessage.addListener(m => {
    console.log(m)
    if (m.type == "disconnect" && connectionState.textContent !== "No connection") connectionState.textContent = "No connection"
    else if (m.type == "connection") connectionState.textContent = "Connected at: "+(ipInput.value = m.value)
})

chrome.runtime.sendMessage({type:"getConnectState"})  

function connect() {
    chrome.storage.sync.set({serverAddress:ipInput.value}, ()=>{
        chrome.runtime.sendMessage({type:"tryConnectIp", value:ipInput.value})  
    })
}

connectButton.onclick=()=>{
    connect()
}

ipInput.oncontextmenu=(e)=>{
    e.preventDefault()
    ipInput.value = ""
}

ipInput.onkeydown=(e)=>{
    let k = e.key.toLowerCase()
    if (k == "enter") {
        connect()
    }
}


//chrome.tabs.captureVisibleTab(data=>console.log(data))