// JS
// Omnivox Extension by Louis-Charles Biron
// Please don't use nor credit this code as your own.
//

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type == "log") login(true)

    if (message.type == "dm") dmon()
    if (message.type == "dmoff") dmoff()

})

// auto login
function login(force) {
    let href = location.href.toLowerCase()
    if ((href.includes("login") && (!href.includes("error")) || force)) {
        let user = document.getElementById("Identifiant"), pw = document.getElementById("Password"), form = document.getElementById("formLogin")

        if (user && pw) {
            chrome.storage.sync.get((r)=>{
                if (r.lg == true) {
                    let isu = r.u && r.u !== "", isp = r.p && r.p !== ""
                    if (isu) user.value = r.u
                    if (isp) pw.value = r.p
                    if (isu && isp) form.submit()
                }
            })
        }
    }    
}login()



let toph = document.getElementById("headerImage"), bodyb = document.querySelector(".body-identification-intraflex")
chrome.storage.sync.get((r)=>{
    if (r.dm) {
        if (toph) toph.style = "background: url("+chrome.runtime.getURL("img/BackgroundHeader.jpg")+") no-repeat top left !important;"
        if (bodyb) bodyb.style = "background-image: url("+chrome.runtime.getURL("img/background.jpg")+") !important"
    }
})

document.querySelector("html").style.backgroundColor = "#fff"

let ddm = document.createElement("style"), head = document.querySelector("head"), dmcsson = `
html {
    filter: invert(1) hue-rotate(180deg) saturate(1.2) !important;
}
img:not(.noinv), image:not(.noinv), iframe:not(.noinv), video:not(.noinv), 
#headerImage, .modal-overlay {
    filter: invert(1) hue-rotate(180deg) !important;
}
`, dmcssoff = `
html {
    filter: none !important;
}
img:not(.noinv), image:not(.noinv), iframe:not(.noinv), video:not(.noinv),
#headerImage {
    filter: none !important;
}`
ddm.id = "ddm"

function dmon() {
    ddm.remove()
    ddm.appendChild(document.createTextNode(dmcsson))
    head.appendChild(ddm)
    if (bodyb) {
        bodyb.style = "background-image: url("+chrome.runtime.getURL("img/background.jpg")+") !important"
        bodyb.id = "dmbi"
    }
}

function dmoff() {
    ddm.remove()
    ddm.appendChild(document.createTextNode(dmcssoff))
    head.appendChild(ddm)
    if (bodyb) {
        bodyb.style = ""
        bodyb.id = ""
    }
}


document.querySelectorAll("img").forEach((img)=>{
    if (img.alt == "") {
        img.className += " noinv"
        img.className.trim()
    }
})


if (location.href.includes("climoilou.omnivox.ca/WebApplication//Default")) {
    setInterval(()=>{
        let nophoto = document.createElement("style"), el = document.querySelector("frameset > frameset > #frMilieu").contentDocument.getElementById("FrListeBas").contentDocument
        if (el) {
            nophoto.id = "noPhoto"
            let elhead = el.querySelector("head")
            if (elhead && !elhead.querySelector("#noPhoto")) {
                nophoto.appendChild(document.createTextNode(".cPhoto {display:none;}"))
                elhead.appendChild(nophoto)
            }
        }
    },500)
}




