// JS
// SkipYTads Extension by Louis-Charles Biron
// I should really rewrite this code
//


function setInstantInterval(callback, speed) {
        callback()
        return setInterval(callback,speed||1000)
}

let isInterval = -1

chrome.runtime.onMessage.addListener(function(message) {
    if(message.type == "tab_updated" && message.content.info.status == "complete") init()
})

function init() {
    //In video
    if (document.location.href.includes("watch?v")) {
        if (isInterval == -1) isInterval = setInstantInterval(main, 10)
    } else {
        clearInterval(isInterval)
        isInterval = -1
    }

    function main() {
        //static ads
        document.querySelectorAll("ytd-promoted-sparkles-web-renderer, .ytp-ad-overlay-slot, .ytp-ad-overlay-image > img, #companion, #player-ads").forEach((el)=>{
                el.remove()
        })

        //video ads
        if (document.querySelectorAll("[class*=ad-avatar], [class*=ad-pod], [class*=skip-ad-button], [class*=ad-badge]").length) {
            let vid = document.querySelector("#movie_player video")
            vid.currentTime = vid.duration
        }
    }
}init()
