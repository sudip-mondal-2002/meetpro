const authuser = document.getElementById('authuser');
const meeting_name = document.getElementById('meet-name');
document.getElementById('create-meet').addEventListener('click', function() {
    // send event to service worker
    chrome.runtime.sendMessage({action: "create-meet", authuser: authuser.value, meeting_name: meeting_name.value});
});

document.getElementById('godaddy-api-key').addEventListener('blur', function() {
    // send event to service worker
    chrome.runtime.sendMessage({action: "set-api-key", apiKey: this.value});
});