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

  if (request.action === "fetchYouTubeAPI") {
    fetch(request.url)
      .then(response => response.json())
      .then(data => sendResponse({ data }))
      .catch(error => sendResponse({ error: error.message }));
    return true; // Keep the message channel open
  }
});