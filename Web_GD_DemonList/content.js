console.clear()
console.log("run")

function getPlace(arr1, arr2) {// arr1 => arr2 ? {el: variation}
    return arr2.reduce((a, b, i)=>{
        let ind1 = arr1.indexOf(b),
        d = (ind1==-1 ? i : ind1)-i
        return a[b] = d,a
    }, {})
}

function getDiff(arr1, arr2) {// arr1 => arr2 ? -1 si nouveau : 1 si perdu
    return Object.entries(arr1.reduce((a,b)=>{return a[b]=(a[b]||0)+1,a},Object.fromEntries(arr2.map(x=>[x,-1])))).filter(x=>x[1])
}

function iterateDuplicates(arr) {//works best with arr:string
    return [...new Set(arr)].reduce((a, b)=>{
        let i = 0, at = a.indexOf(b)+1, ind = arr.indexOf(b, at)
        while (ind !== -1) {
            a[ind]+=++i
            ind = arr.indexOf(b, at+=ind)
        }
        return a
    }, arr)
}

function getRankColor(r) {
    let v = "#444446"
    if (r == 1) v = "gold"
    else if (r == 2) v = "silver"
    else if (r == 3) v = "#a5542a"
    else if (r <= 10) v = "#d33434"
    else if (r <= 30) v = "#9f67b3"
    return v
}

let list = [...document.querySelectorAll(".panel h2 > a")].map(x=>({rank:+x.textContent.match(/[0-9]{1,3}/g), name:x.textContent.match(/[a-z ]\w+/gi).join("").trim()})),
list_names = iterateDuplicates(list.map(x=>x.name))

chrome.storage.local.get((r)=>{
    let old_list = r.list, old_list_names = iterateDuplicates(r.list.map(x=>x.name))
    if (old_list) {

        // CREATE
        let top = document.querySelector("aside.right > section"),
        newDiv = document.createElement("div")
        newDiv.style = `
        display: flex;
        flex-direction: column;
        font-size: 1.5em;
        align-items: center;
        justify-content: space-between;
        min-height: 200px;
        margin-bottom: 20px;
        `

        let beaten = document.createElement("div")
        beaten.style = `
        font-size: 0.75em;
        padding: 14px 0 4px 0;
        border: 3px solid aliceblue;
        border-radius: 14px;
        color: rgb(247, 208, 0);
        background-color: rgba(240, 248, 255, 0.19);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        `

        let newLvlsP = document.createElement("div"),
        newLvlsH = document.createElement("h2")
        newLvlsH.textContent = "New Levels: "
        newLvlsH.style.color = "#5ac65a"
        let newLvls = document.createElement("div")
        newLvls.textContent = "No new level since last visit..."

        let byeLvlsP = document.createElement("div"),
        byeLvlsH = document.createElement("h2")
        byeLvlsH.textContent = "Now Legacy: "
        byeLvlsH.style.color = "black"
        let byeLvls = document.createElement("div")
        byeLvls.textContent = "No level has fallen since last visit..."

        let newMovesP = document.createElement("div"),
        newMovesH = document.createElement("h2")
        newMovesH.textContent = "Moves: "
        newMovesH.style.color = "#b451b4"
        let newMoves = document.createElement("div")
        newMoves.textContent = "No level has moved since last visit..."

        newLvls.style = byeLvls.style = newMoves.style = `
        display: flex;
        flex-direction: column;
        font-size: 0.9em;
        margin-top:12px
        `

        newLvlsP.style = byeLvlsP.style = newMovesP.style = "margin-bottom:15px"

        newLvlsH.style.borderBottom = byeLvlsH.style.borderBottom = newMovesH.style.borderBottom = "2px solid lightgray"
        newLvlsH.style.padding = byeLvlsH.style.padding = newMovesH.style.padding = "2px 0"
        newLvlsH.style.fontSize = byeLvlsH.style.fontSize = newMovesH.style.fontSize = "1.23em"
        newLvlsH.style.fontWeight = byeLvlsH.style.fontWeight = newMovesH.style.fontWeight = "600"
        newLvlsH.style.letterSpacing = byeLvlsH.style.letterSpacing = newMovesH.style.letterSpacing = "2px"

        // SET
        let asda = 0, asda2 = 0
        getDiff(old_list_names, list_names).forEach((l)=>{
            if (asda==0) {asda++;byeLvls.textContent=newLvls.textContent=""}
            if (l[1] == 1) {
                let span = document.createElement("span")
                span.textContent = l[0]
                span.style.fontVariant = "italic"
                byeLvls.appendChild(span)
            }
            else {
                let span = document.createElement("span"), rank = list[list_names.indexOf(l[0])].rank
                span.textContent = l[0]+" #"+rank
                span.title = "Scroll to "+l[0]
                span.style = "cursor: pointer;margin-bottom:2px;color: "+getRankColor(rank)+";font-size:1em"
                span.onclick=()=>{
                    document.querySelectorAll(".panel h2 > a").forEach((el)=>{
                        if (el.textContent.includes(l[0]) && el.textContent.includes(rank)) {
                            el.scrollIntoView()
                            document.querySelector("html").scrollBy(0, -130)
                        }
                    })
                }
                newLvls.appendChild(span)
            }
        })

        let all_moves = getPlace(old_list_names, list_names), moves = Object.entries(all_moves).filter(x=>x[1] > 0)

        moves.forEach((m)=>{
            if (asda2==0) {asda2++;newMoves.textContent=""}
            let span = document.createElement("span"), rank = list[list_names.indexOf(m[0])].rank
            span.textContent = m[0]+" ↑ "+m[1]+" place"+(m[1]>1?"s":"")+" (#"+rank+")"
            span.style.color = getRankColor(rank)
            newMoves.appendChild(span)
        })

        function newBeaten(name) {
            let span = document.createElement("span")
            span.textContent = name+" 100%!"
            span.style = "margin-bottom: 10px;"
            beaten.appendChild(span)
        }

        document.querySelectorAll("#legacy > ul > li").forEach((l)=>{
            let n = l.textContent.toLowerCase()
            if (
                n.includes("duelo maestro") ||
                n.includes("marathon") ||
                n.includes("cataclysm") ||
                n.includes("phobos") ||
                n.includes("ice carbon diablo x") ||
                n.includes("aftermath") ||
                n.includes("bloodbath")
            ) newBeaten(l.title)
        })


        // DISPLAY
        newLvlsP.appendChild(newLvlsH)
        newLvlsP.appendChild(newLvls)
        newDiv.appendChild(newLvlsP)

        newMovesP.appendChild(newMovesH)
        newMovesP.appendChild(newMoves)
        newDiv.appendChild(newMovesP)
        
        byeLvlsP.appendChild(byeLvlsH)
        byeLvlsP.appendChild(byeLvls)
        newDiv.appendChild(byeLvlsP)

        newDiv.appendChild(beaten)

        top.prepend(newDiv)



    } else {
        console.log("First Visit")
        chrome.storage.local.set({list: list})
    }
})

chrome.storage.local.set({list: list})

function s() {chrome.storage.local.set({list: list})}






