// JS
// Birthday manager by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

let month_bankEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
wday_bankEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function msToTime(ms=0) {// y:0, d:1, h:2, m:3, s:4, ms:5
    return [365.2422,24,60,60,1000].reduce((a, b, i)=>(a.push((a[i]%1)*b),a),[ms/1000/60/60/24/365.2422]).map(x=>x>>0)
}

function typeWriter(txt, speed, el) {
    [...txt].reduce((s, b)=>{
        setTimeout(()=>{el.textContent += b},s)
        return s+speed
    }, speed)
}

function p(v) {
    return (v>1) ? "s" : ""
}

function validate(conditions, errs, errSeparator='') {// [if true then error], [error msg]   (same length)
    return errs.reduce((a,b,i)=>(a[i]&&=errSeparator+b,a),conditions.map(x=>x||'')).join('').slice(errSeparator.length)
}

function keepCheckbox(el, storageType, storageName, initChecked, cbOnclick, callbackOn, callbackOff) {//*arg filled
    chrome.storage[storageType].get((r)=>(el.checked=r[storageName]??initChecked)?cbOnclick||callbackOn():cbOnclick||callbackOff())
    return el.addEventListener("click",()=>chrome.storage[storageType].set({[storageName]:((el.checked?callbackOn():callbackOff()),el.checked)})),el
}

function pad0(num) {return (num	< 10) ? '0'+ num : num}

function asda() {
    chrome.storage.sync.clear()
    chrome.storage.sync.set({
        $a:1,
        $bd:[]
    })
}

function r() {
    chrome.storage.sync.get((r)=>{console.log(r)})
}