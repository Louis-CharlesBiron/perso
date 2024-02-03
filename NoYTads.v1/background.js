// JS
// skipYTads Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

function sendMessage(content, type, toContent) {// str, str, boolean
    if (toContent == true) {
    chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {content: content, type: type}).catch((e)=>console.log(e))
    })} else {
        chrome.runtime.sendMessage({content: content, type: type})
}}


chrome.tabs.onUpdated.addListener((e, info)=>{
    sendMessage({e:e, info:info}, "tab_updated", true)
})