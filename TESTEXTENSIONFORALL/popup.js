// JS
// Template Extension by LCB
//

// On content loaded →
document.addEventListener("DOMContentLoaded", function () {
document.querySelector("#test").onclick=()=>{
 chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {content: "set", type: "set"});
  });

  chrome.runtime.sendMessage({content: "setb", type: "setb"})
}

    
});

    