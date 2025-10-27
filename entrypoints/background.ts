/// <reference types="chrome" />

export default defineBackground(() => {
  console.log('Hello background!', {id: browser.runtime.id});
  // chrome.declarativeNetRequest.getDynamicRules((rules) => {
  //   console.log('Current dynamic rules:', rules);
  // });

  chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed or updated");
    registerHeaderMotifier()
  });
});

function registerHeaderMotifier() {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "modifyHeaders",
          requestHeaders: [
            {header: "referer", operation: "remove"}
          ]
        },
        condition: {
          urlFilter: "https://*imgur.com/*",
          resourceTypes: ["image", "media"],
          initiatorDomains: ["ptt.cc"]
        }
      }
    ],
    removeRuleIds: [1]
  });
}
