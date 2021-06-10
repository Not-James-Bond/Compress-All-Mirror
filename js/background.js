chrome.runtime.onInstalled.addListener(function() {
var contextMenuItem ={
    "id":"compress",
    "title":"compress",
    "contexts": ["all"]
};

//for creating the context in the list
chrome.contextMenus.create(contextMenuItem);

//action to be performed after clicking the added context
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId){
           alert("work done");
    }
})