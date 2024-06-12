chrome.runtime.onMessage.addListener(m => {
    console.log(m)
    if (m.type == "command") commandManager(m)
})

// COMMANDS
function commandManager(m) {
    //command action
    if (m.command == "test") {
        console.log("test:", m.value)
    }
}