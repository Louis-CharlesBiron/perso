// JS
// SkipYTads Extension by Louis-Charles Biron
// Please don't use nor credit this code as your own.
//


function setInstantInterval(callback, speed) {
    if (typeof callback == "function") {
        callback()
        return setInterval(callback,speed||1000)
    }
}

var isInterval = -1

chrome.runtime.onMessage.addListener(function(message) {
    if(message.type == "tab_updated" && message.content.info.status == "complete") {//
        console.log(message.content.e, message.content.info)
        init()
    }
})

function init() {
    //In video
    if (document.location.href.includes("watch?v")) {
        if (isInterval == -1) {isInterval = setInstantInterval(main, 10)}
    } else {
        clearInterval(isInterval)
        isInterval = -1
    }

    function main() {
        //static ads
        document.querySelectorAll("ytd-promoted-sparkles-web-renderer, .ytp-ad-overlay-slot, .ytp-ad-overlay-image > img, #companion, #player-ads").forEach((el)=>{
                el.remove()
        })

        if (document.querySelector(".ytp-ad-skip-button-container")) {
            document.querySelector(".ytp-ad-skip-button-container").click()
        }

        //video ads
        if (document.querySelector(".ytp-ad-preview-container")) {
            let vid = document.querySelector("#movie_player video")
            vid.currentTime = vid.duration
        }
    }
}init()
