// JS
// Code Library by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
document.addEventListener("DOMContentLoaded", function() {

    function deSelect() {
        if (window.getSelection) {window.getSelection().removeAllRanges()}
        else if (document.selection) {document.selection.empty()}
    }

    var search = document.querySelector("#search"), codeBlocks = document.querySelectorAll(".content") 
    search.oninput=()=>{
        let v = search.value.toLowerCase()
        codeBlocks.forEach((el)=>{
            let key = el.getAttribute("keywords")
            if (key.includes(v)) {
                el.style.display = ""
            } else {
                el.style.display = "none"
            }
        })
    }

    document.querySelectorAll("#copyBtn").forEach((el)=>{
        el.onclick=()=>{
            let v = el.parentElement.nextElementSibling
            if (navigator.clipboard) {navigator.clipboard.writeText(v.value.trim())}
            v.select();
            v.setSelectionRange(0, 99999);

            el.style.transform = "rotateZ(360deg)"
            setTimeout(()=>{el.style.transform = "rotateZ(0deg)";if(navigator.clipboard){deSelect()}},700)
        }
    })

    // document.querySelectorAll("textarea").forEach((el)=>{
    //     el.onkeydown=(e)=>{if (e.ctrlKey && e.key == "c") {deSelect()}}
    // })

    document.querySelectorAll(".codeBloc").forEach((el)=>{
        el.textContent = el.textContent.trim()
    })


});