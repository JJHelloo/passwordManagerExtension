/*global chrome*/

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ loginState: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "logout") {
        chrome.storage.local.set({ loginState: false }, () => {
            console.log("User has logged out");
        });
    } else if (request.message === "login") {
        chrome.storage.local.set({ loginState: true }, () => {
            console.log("User has logged in");
        });
    }
    sendResponse();
    return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./foreground_styles.css"],
        });

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"],
        });
    }
});
