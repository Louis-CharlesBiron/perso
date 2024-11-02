// JS
// Convenient Extension by Louis-Charles Biron
// Please don't use nor credit this code as your own.
//

function set_storage(type, name, value) {chrome.storage[type].set({[name]:value})}

function setCaretPos(el, caretPos) {
    if (el.createTextRange) {
        let range = el.createTextRange()
        range.move('character', caretPos)
        range.select()
    } else if (el.selectionStart) {
        el.focus()
        el.setSelectionRange(caretPos, caretPos)
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type == "cclipboard") {cbPaste(message.content)}
})

function cbPaste(v) {
    let pels = document.querySelectorAll(":focus-within:not([readonly]):not([disabled]), :focus:not([readonly]):not([disabled]), :focus-visible:not([readonly]):not([disabled])"), el = pels[pels.length-1],
    carPos = el&&el.selectionStart
    if (el && typeof el.value == "string") {
        el.value = (isFinite(carPos)) ? el.value.slice(0, carPos)+v+el.value.slice(carPos, Infinity) : el.value+v
        setCaretPos(el, carPos+v.length)
    } else if (el) {
        el.textContent += v
    }
}

document.oncontextmenu=(e)=>{
    let el = e.target, t = el.tagName.toLowerCase()
    if (e.altKey && e.shiftKey && (t == "input" || t == "textarea" || el.contentEditable == "true")) {
        el.value = ""
        e.preventDefault()
    }
}
