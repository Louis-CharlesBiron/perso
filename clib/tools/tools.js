// JS
// Code Library by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
document.addEventListener("DOMContentLoaded", function() {

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

    // document.querySelectorAll("textarea").forEach((el)=>{
    //     el.onkeydown=(e)=>{if (e.ctrlKey && e.key == "c") {deSelect()}}
    // })

    function num_input_opt(v, invalids, rounding, min, max) {// valids = "1234567890-+.Ee"
        let inv_list = invalids.split(""), inv_ll = inv_list.length, new_v = v
        inv_list.forEach((x)=>{
            new_v = new_v.replaceAll(x,"")
        })
        let fv = Number(new_v)
        if (min && fv < min) {fv = min}
        if (max && fv > max) {fv = max}
        if (v !== "") {return (isFinite(rounding) && !isNaN(rounding)) ? Number(fv.toFixed(rounding)) : fv}
        else {return ""}
    }
    function match(string, ...matchers) {
        let res_list=[]
        matchers.forEach((matcher)=>{
            res_list = res_list.concat(string.match(matcher)||[])
        })
        return res_list
    }
    String.prototype.replaceAt = function(index, v, replace_ll) {return this.slice(0, index)+v+this.slice(index+(replace_ll||1), Infinity)}
    function deSelect() {
        if (window.getSelection) {window.getSelection().removeAllRanges()}
        else if (document.selection) {document.selection.empty()}
    }
    function copy_el(elv, el) {
        if (navigator.clipboard) {navigator.clipboard.writeText(elv.value)}
            elv.select();
            elv.setSelectionRange(0, 99999);

        el.style = "transform:rotateZ(360deg);transition: transform 0.4s"
        setTimeout(()=>{el.removeAttribute("style");if(navigator.clipboard){deSelect()}},700)
    }

    // Text iteration // ti_
    let ti_icount = document.querySelector("#ti_icount"), ti_input = document.querySelector("#ti_input"), ti_jump = document.querySelector("#ti_jump"), ti_copy = document.querySelector("#ti_copy"), ti_preview = document.querySelector("#ti_preview")
    ti_jump.oninput = ti_input.oninput = ti_icount.oninput=()=>{
        ti_icount.value = num_input_opt(ti_icount.value, "+.Ee", 0, 0, 100000)
        ti_jump.value = num_input_opt(ti_jump.value, "+", 0, false, false)
        let v = ti_input.value, num_list = match(v, /\d+/g), num_list_ll = num_list.length, index = 0, iv = v, fv = ""
        function ti(jump) {
            iv = v
            index = 0
            for (let i = 0;i<num_list_ll;i++) {
                let num = Number(num_list[i]), num_ll = num.toString().length
                index = iv.indexOf(num, (index+num_ll+1))
                iv = iv.replaceAt(index<0?0:index, num+jump, num_ll)
            }
            fv+=iv
        }
        for (let i = 0;i<(ti_icount.value||1);i++) {ti(i*ti_jump.value)}
        ti_preview.value = fv
    }
    document.querySelector("#ti_clear").onclick=()=>{ti_input.value=ti_preview.value=""}
    ti_copy.onclick=()=>{copy_el(ti_preview, ti_copy.firstElementChild)}


    // Auto HTML Element Var Declaration (#id)
    let aevd_input = document.querySelector("#aevd_input"), aevd_preview = document.querySelector("#aevd_preview"), aevd_copy = document.querySelector("#aevd_copy")

    aevd_input.oninput=()=>{
        let list = match(aevd_input.value, /(id( *)=( *)\"[^\"]+\")+/gi, /(id( *)=( *)\'[^\']+\')+/gi, /(class( *)=( *)\"[^\"]+\")+/gi, /(class( *)=( *)\'[^\']+\')+/gi), fv="let "
        list.forEach((v)=>{
            let type = v.split("=")[0],
            name = v.split("=")[1].match(/([^\"\'\`])+/gi).join(""),
            varName = name.replaceAll(/[-+*/ ]/g, "")
            varName = (varName.charAt(0).match(/[0-9]/g)) ? "_"+varName : varName
            console.log(type, name, varName)
            fv += varName+" = document."+((type == "class") ? 'querySelector(".' : 'getElementById("')+name+'"), '
        })
        
        aevd_preview.value = (list.length > 0) ? fv.slice(0, fv.length-2) : "No elements detected"
    }
    aevd_copy.onclick=()=>{copy_el(aevd_preview, aevd_copy.firstElementChild)}
    document.querySelector("#aevd_clear").onclick=()=>{aevd_input.value=aevd_preview.value=""}



    // Getter / Setter
    gs_input.oninput=gs_lang.oninput=gs_mode.oninput=()=>{
        let v = gs_input.value, lang = gs_lang.value, mode = gs_mode.value

        if (lang == "js") {
            let attrs = [...new Set(v.match(/this\.[a-z_$]{1}[a-z_$0-9]+[()]*/gi))].filter(x=>!x.match(/[()]/gi)).map(x=>x.replace("this.",""))
            
            gs_preview.value = mode=="get" ? attrs.reduce((a, b)=>a+=`\tget ${b.replace("_","")  }() {return this.${b}}\n`,"")
                : mode=="set" ? attrs.reduce((a, b)=>a+=`\tset ${b.replace("_","")}(${b}) {return this.${b} = ${b}}\n`,"")
                : attrs.reduce((a, b)=>a+=`\tget ${b.replace("_","")}() {return this.${b}}\n`,"")+"\n"+attrs.reduce((a, b)=>a+=`\tset ${b.replace("_","")}(${b}) {return this.${b} = ${b}}\n`,"")

                console.log(mode=="get" ? attrs.reduce((a, b)=>a+=`\tget ${b.replace("_","")  }() {\n\t\treturn this.${b}\n\t}\n\n`,"")
                : mode=="set" ? attrs.reduce((a, b)=>a+=`\tset ${b.replace("_","")}(${b}) {\n\t\treturn this.${b} = ${b}\n\t}\n\n`,"")
                : attrs.reduce((a, b)=>a+=`\tget ${b.replace("_","")}() {\n\t\treturn this.${b}\n\t}\n\n`,"")+"\n\n"+attrs.reduce((a, b)=>a+=`\tset ${b.replace("_","")}(${b}) {\n\t\treturn this.${b} = ${b}\n\t}\n\n`,""))

        } else if (lang == "c#") {
            let attrs = [...new Set(v.match(/private [a-z_0-9]+ [a-z_$]{1}[a-z_$0-9]+([ ]*=[ ]*.*)?;/gi))].map(x=>x.replace(/(private |;)/gi,"").split(" "))

            gs_preview.value = attrs.reduce((a, b)=>a+=`\tpublic ${b[0]} ${b[1].replace(/[$_]/g,"").replace(/(?:\s|^)[a-z]/g,x=>x.toUpperCase())} {\n\t\tget {return ${b[1]};}\n\t\tset {this.${b[1]} = value;}\n\t}\n\n`,"")
        }

    }

    gs_copy.onclick=()=>{copy_el(gs_preview, gs_copy.firstElementChild)}
    gs_clear.onclick=()=>{gs_input.value=gs_preview.value=""}



});