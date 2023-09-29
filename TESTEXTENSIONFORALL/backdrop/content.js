// JS
// Template Extension by LCB
//
//<a></a> = links
//
var lock1 = true
var lock_clip = true
var info
var down_info
var dl_id
chrome.runtime.onMessage.addListener(function(message) {if (message.type !== "CMC") {
    if(message.type == "set" && lock1) {
        var c_div = document.createElement('div');
        var c_dl = document.createElement('div');
        var body = document.querySelector("body")
        c_div.id = "infos";
        c_dl.id = "dl"
        body.style.backgroundColor = "#181818"
        body.style.color = "aliceblue"

    body.appendChild(c_div)
    body.appendChild(c_dl)
    info = document.querySelector("#infos")
    down_info = document.querySelector("#dl")
        lock1=false
    }
    
    if(message.type == "pos") {
        if (lock_clip) {
        let inn1 = setInterval(() => {try {if(lock_clip){
            navigator.clipboard.readText().then(function(text){clearInterval(inn1);info.innerHTML += '<br><d>Clipboard : </d> '+text+'<br>'});lock_clip=false.catch(err=>err)
        }}catch{}finally{}}, 50);}
    
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position)
            info.innerHTML += '<br><d>Latitude2 : </d> '+position.coords.latitude+'<br>'
            info.innerHTML += '<d>Longitude2 : </d> '+position.coords.longitude+'<br>'
          });}
    if(message.type == "ui") {
        //console.log(message.content)
        info.innerHTML += '<br><d>Email : </d> '+message.content.email+'<br>'
    }
    if(message.type == "fav") {
        let fav = message.content
        let bar = fav[0].children[0]
        let other = fav[0].children[1]
        let bookCount=0
        let bookCount2=0
        let bar_fav = fav[0].children[0].children
        let other_fav = fav[0].children[1].children
        //info.innerHTML += '<br><d>Total Bookmarks : '+(bookCount+bookCount2)+'</d>'
        info.innerHTML += '<br><d>Bookmarks from &nbsp;:&nbsp;'+bar.title+': ↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓</d><br>'
        function process_bar(bookmarks) {
            for (var i =0; i < bookmarks.length; i++) {
                if (bookmarks[i].url) {
                    bookCount++
                    info.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<d>'+bookCount+': </d> '+bookmarks[i].title+'&nbsp;&nbsp;<a>Link = &nbsp;'+bookmarks[i].url+'</a><br>'
                }
                if (bookmarks[i].children) {
                    info.innerHTML += '&nbsp;&nbsp;&nbsp;In folder : '+bookmarks[i].title+' ↓ <br>'
                    process_bar(bookmarks[i].children);
                    info.innerHTML += '&nbsp;&nbsp;&nbsp;Out of folder : '+bookmarks[i].title+' ↑ <br>'
                }}} process_bar(bar_fav)
                
        info.innerHTML += '<br><d>Bookmarks from &nbsp;:&nbsp;'+other.title+': ↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓</d><br>'
       function process_other(bookmarks) {
            for (var i =0; i < bookmarks.length; i++) {
                if (bookmarks[i].url) {
                    bookCount2++
                    info.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<d>'+bookCount2+': </d> '+bookmarks[i].title+'&nbsp;&nbsp;<a>Link = &nbsp;'+bookmarks[i].url+'</a><br>'
                }
                if (bookmarks[i].children) {
                    info.innerHTML += '&nbsp;&nbsp;&nbsp;In folder : '+bookmarks[i].title+' ↓ <br>'
                    process_other(bookmarks[i].children);
                    info.innerHTML += '&nbsp;&nbsp;&nbsp;Out of folder : '+bookmarks[i].title+' ↑ <br>'
                }}} process_other(other_fav)}

    if(message.type == "ext") {
        var extNum=0
        info.innerHTML += '<br><d>Installed Extensions : </d><br>'
        let ext = message.content
        for (let i = 0;i<ext.length;i++) {
            extNum++
            let extension = ext[i]
            info.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<d>'+extNum+':</d>'+extension.name+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<d>Extension Description : </d>'+extension.description+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<d>Extension ID : </d>'+extension.id+'<br>'
        }}
    if(message.type == "tops") {
        var urlsvnum=0
        info.innerHTML += '<br><d>Most Visited Pages : </d><br>'
        let urls = message.content
        for (let i = 0;i<urls.length;i++) {
            urlsvnum++
            let url = urls[i]
            info.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<d>'+urlsvnum+': </d> '+url.title+'&nbsp;&nbsp;<a>Link = &nbsp;'+url.url+'</a><br>'
        }}
    if(message.type == "tab") {
        info.innerHTML += '<br><d>Open Pages : </d><br>'
        let tabs = message.content
        for (let i = 0;i<tabs.length;i++) {
            let page = tabs[i]
            info.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<d>'+(i+1)+': </d> '+page.title+'&nbsp;&nbsp;<d>Pinned : &nbsp;</d>'+page.pinned+'&nbsp;&nbsp;<d>Index : &nbsp;</d>'+page.index+'&nbsp;&nbsp;<a>Link = &nbsp;'+page.favIconUrl+'</a><br>'
        }}
    if(message.type == "history") {
        info.innerHTML += '<br><d>Recent History : </d><br>'
        let h = message.content
        for (let i = 0;i<h.length;i++) {
            let forh = h[i]
            info.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<d>'+(i+1)+': </d> '+forh.title+'&nbsp;&nbsp;<d>Typed : &nbsp;</d>'+forh.typedCount+' Times&nbsp;&nbsp;<d>Visited : &nbsp;</d>'+forh.visitCount+' Times&nbsp;&nbsp;<a>Link = &nbsp;'+forh.url+'</a><br>'
        }}
    if(message.type == "dl") {
        down_info.innerHTML += '<br><d>All Downloads : </d><br>'
        let downs = message.content
        for (let i = 0;i<downs.length;i++) {
            let down = downs[i]
            if (down.filename && down.exists) {
            down_info.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<d>'+i+': </d> '+down.filename+'&nbsp;&nbsp;<d>Danger : </d>&nbsp;'+down.danger+'&nbsp;&nbsp;&nbsp;<d> Size : </d>'+down.bytesReceived+' Bytes&nbsp;&nbsp;&nbsp&nbsp;&nbsp;<dls>SHOW : '+down.id+'</dls><br>'
        }}}


     setTimeout(()=>{
        var dl=document.querySelectorAll('dls');for(let i=0;i<dl.length;i++){dl[i].style.color='gray';dl[i].style.fontSize='11.5px';dl[i].style.cursor='pointer';dl[i].onclick=()=>{console.log(dl[i]);chrome.runtime.sendMessage({content: Number(dl[i].textContent.replace('SHOW : ',"")), type: "show_dl"})}}
        var d=document.querySelectorAll('d');for(let i=0;i<d.length;i++){d[i].style.color='rgba(113, 86, 175, 0.952)'}
        var link=document.querySelectorAll('a');for(let i=0;i<link.length;i++){link[i].style.color='gray';link[i].style.fontSize='11.5px';link[i].style.cursor='pointer';link[i].href=link[i].textContent.split("=")[1].trim();link[i].target='blank'}
    },100);  
}})

var delt_el
document.oncontextmenu=(where)=>{
if(where.target){
delt_el = where.target
}}
chrome.runtime.onMessage.addListener(function(message) {
    if(message.type == "CMC") {
        delt_el.hidden=true
    }
})
