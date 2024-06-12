// JS
// Template Extension by Louis-Charles Biron
// Please don't use nor credit this code as your own.
//

chrome.runtime.onMessage.addListener(m => {
    if (m.isCommand) commandManager(m.command, m.value)
})

// COMMANDS
function commandManager(c, v) {
    console.log(c, v)
    //command action
    if (c == "test") {
        console.log("test:", v)
    }
}