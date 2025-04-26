// This script runs on YouTube pages
console.log("AI Content Summarizer Content Script Loaded");

function isYouTubeVideoPage() {
  return window.location.hostname.includes('youtube.com') &&
         window.location.pathname.includes('/watch');
}

let currentUrl = window.location.href;
const observer = new MutationObserver(() => {
  if (currentUrl !== window.location.href) {
    currentUrl = window.location.href;
    checkForVideoAndNotify();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function checkForVideoAndNotify() {
  if (isYouTubeVideoPage()) {
    chrome.runtime.sendMessage({ action: "videoDetected", url: window.location.href });
  }
}

checkForVideoAndNotify();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getVideoInfo") {
    const videoTitle = document.querySelector('h1.title')?.textContent || '';
    
    sendResponse({
      title: videoTitle,
      url: window.location.href
    });
  }
  return true;
});
