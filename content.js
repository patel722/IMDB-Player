// Function to hide ad elements
function hideAds() {
    const adSelectors = [
      '.ipc-ad-slot', // General ad slot
      '.ab_widget', // Specific ad widget
      '.hero-widget', // Hero ad widget
      '[data-testid="injected_ad"]', // Data test id based ad element
    ];
  
    adSelectors.forEach(selector => {
      const adElements = document.querySelectorAll(selector);
      adElements.forEach(element => {
        element.style.display = 'none';
      });
    });
  }
  
  // Run the function to hide ads
  hideAds();
  
  // Also observe for any new ad elements added dynamically
  const observer = new MutationObserver(hideAds);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  