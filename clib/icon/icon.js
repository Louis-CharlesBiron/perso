// JS
// Code Library by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
document.addEventListener("DOMContentLoaded", function() {

    function match(string, ...matchers) {
        let res_list=[]
        matchers.forEach((matcher)=>{
            res_list = res_list.concat(string.match(matcher)||[])
        })
        return res_list
    }
    function deSelect() {
        if (window.getSelection) window.getSelection().removeAllRanges()
        else if (document.selection) document.selection.empty()
    }
    function copy_el(elv, el) {
        if (navigator.clipboard) navigator.clipboard.writeText(elv.value)
        elv.select();
        elv.setSelectionRange(0, 99999);

        el.style = "transform:rotateZ(360deg);transition: transform 0.4s"
        setTimeout(()=>{el.removeAttribute("style");if(navigator.clipboard)deSelect()},700)
    }

    var size = 64, search = document.getElementById("search"), icons = document.querySelectorAll(".icon"), root = document.querySelector(":root")

    
    search.oninput=()=>{
        let v = search.value, regex = new RegExp("["+v+"]","gi"), anti = new RegExp("[^"+v+"]","gi")

        icons.forEach((el)=>{
            let key = el.getAttribute("keywords")
            console.log(v.length <= match(key, regex).length, match(key, anti))
            el.style.display = ((key.match(regex) || v == "") && (v.length <= match(key, regex).length || match(key, anti).length <= 1)) ? "" : "none"
        })
    }

    sizeir.oninput=sizei.oninput=(e)=>{
        size = e.target.value
        sizeir.value = sizei.value = size
        root.style.setProperty("--size", size+"px")
    }   

    copy.onclick=()=>{
        let selIcon = document.querySelector("#iconCheck:checked ~ svg:not([style*='display'])")
        if (selIcon) {
            copyArea.value = `<svg width="${size}" height="${size}"`+selIcon.outerHTML.replace(/( style=".+;")+/gi, "").slice(4)
            copy_el(copyArea, copy)
            console.log(copyArea.value+"\n")
        }
    }

    filli.onclick=()=>{
        icons.forEach((el)=>{
            let svg = el.querySelectorAll("svg")
            if (filli.checked && svg[1]) {
                svg[0].style.display = "none"
                svg[1].style.display = ""   
            } else if (!filli.checked) {
                svg[0].style.display = ""
                if (svg[1]) svg[1].style.display = "none"   
            }
        })
    }


});