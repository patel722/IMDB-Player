document.getElementById('save-button').addEventListener('click', () => {
  const baseUrl = document.getElementById('base-url').value;
  chrome.storage.sync.set({ baseUrl }, () => {
    alert('Base URL saved.');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('baseUrl', (data) => {
    document.getElementById('base-url').value = data.baseUrl || '';
  });
});
