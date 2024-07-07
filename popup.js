const authuser = document.getElementById('authuser');
const meeting_name = document.getElementById('meet-name');
const domain = document.getElementById('domain');
const apiKeyInput = document.getElementById('godaddy-api-key');

document.getElementById('create-meet').addEventListener('click', function() {
    // send event to service worker
    chrome.runtime.sendMessage({action: "create-meet", authuser: authuser.value, meeting_name: meeting_name.value});
});

// Event listener for setting API key
apiKeyInput.addEventListener('blur', function() {
    // send event to service worker
    chrome.runtime.sendMessage({action: "set-api-key", apiKey: this.value});
});

domain.addEventListener('blur', function() {
    // send event to service worker
    chrome.runtime.sendMessage({action: "set-domain", domain: this.value});
});
// Additional event listeners for new interactive elements
document.querySelectorAll('.interactive-element').forEach(item => {
    item.addEventListener('click', event => {
        // Handle interactive element click event
    });
});

// Implement AJAX calls for dynamic content loading
function loadDynamicContent() {
    fetch('some-endpoint')
        .then(response => response.json())
        .then(data => {
            // Update the DOM with the fetched data
        })
        .catch(error => console.error('Error loading dynamic content:', error));
}

// Update messaging to background.js to support new features
function updateBackgroundMessaging() {
    chrome.runtime.sendMessage({action: "new-feature-support", details: "Details about the new feature"});
}
