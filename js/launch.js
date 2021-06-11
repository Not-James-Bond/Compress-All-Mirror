const url = "ui/comp.html";


chrome.browserAction.onClicked.addListener(function(activeTab)
{
    chrome.tabs.create({ url: url });
});
