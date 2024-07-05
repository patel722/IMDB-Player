chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "playMovie",
      title: "Play Movie",
      contexts: ["page"],
      documentUrlPatterns: ["*://www.imdb.com/title/*"]
    });
  
    chrome.contextMenus.create({
      id: "playShow",
      title: "Play Show",
      contexts: ["page"],
      documentUrlPatterns: ["*://www.imdb.com/title/*"]
    });
  
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === "playMovie" || info.menuItemId === "playShow") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: playMedia,
          args: [info.menuItemId]
        });
      }
    });
  });
  
  async function playMedia(menuItemId) {
    const { baseUrl } = await chrome.storage.sync.get('baseUrl');
    if (!baseUrl) {
      alert("Please set the base URL in the extension settings.");
      return;
    }
  
    const imdbID = window.location.pathname.split('/')[2];
    let embedURL;
  
    if (menuItemId === "playMovie") {
      embedURL = `${baseUrl}/embed/movie?imdb=${imdbID}`;
    } else if (menuItemId === "playShow") {
      embedURL = `${baseUrl}/embed/tv?imdb=${imdbID}`;
    }
  
    // Use the full URL for window.open
    window.open(embedURL.startsWith('http') ? embedURL : `https://${embedURL}`, '_blank');
  }
  