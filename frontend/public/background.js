chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Content Summarizer has been installed");
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCurrentUrl") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        sendResponse({ url: tabs[0].url });
      });
      return true;
    }
  });