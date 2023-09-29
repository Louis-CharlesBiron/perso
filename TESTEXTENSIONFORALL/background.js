// JS
// Template Extension by LCB
//
function give_info(content, type) {
    chrome.tabs.query({
        currentWindow: true,
        active: true
      }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {content: content, type: type});
      });
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type == "show_dl") {
        chrome.downloads.show(message.content)
        console.log(message.content)
    }
    if(message.type == "setb") {
        //
    give_info('pos', 'pos')
        //
    chrome.identity.getProfileUserInfo(function(userInfo) {
    give_info(userInfo, 'ui')      
    });
       //
    chrome.bookmarks.getTree((fav)=>{
    give_info(fav, 'fav')
    })
        //
    chrome.management.getAll(function(ext){
    give_info(ext, 'ext')
    })
    chrome.topSites.get(function(mvURL){
    give_info(mvURL, 'tops')
    })
    chrome.downloads.search({limit: 999999999},function(downloads) {
    give_info(downloads, 'dl')
    });
    chrome.tabs.query({},function(tab){
        give_info(tab, 'tab')
    });
    chrome.history.search({text:''},(h)=>{
        give_info(h, 'history')
    })
}})

chrome.contextMenus.create({id:"0",title:"Delete",type:"normal",contexts:["all"]})

function del_el() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
      }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {content: "del_el", type: "CMC"});
      })}
chrome.contextMenus.onClicked.addListener(del_el)

chrome.runtime.onUpdateAvailable.addListener(()=>{console.log('a')})

