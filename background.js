chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if ( /chatwork.com/.test(tab.url) ) {
        chrome.pageAction.show(tabId);
    }
});
