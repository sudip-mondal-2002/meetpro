let API_KEY;
let domain = "meet.sudipmondal.co.in";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'create-meet':
            createGoogleMeet(request.meeting_name, request.authuser);
            break;
        case 'meet-created':
            shortenUrl(request, sender.tab.url);
            break;
        case 'set-api-key':
            API_KEY = request.apiKey;
            // Validate API key format
            if (!isValidApiKey(API_KEY)) {
                sendResponse({ success: false, message: "Invalid API key format" });
            } else {
                sendResponse({ success: true });
            }
            break;
        case 'set-domain':
            domain = request.domain;
            // Validate domain format
            if (!isValidDomain(domain)) {
                sendResponse({ success: false, message: "Invalid domain format" });
            } else {
                sendResponse({ success: true });
            }
            break;
        default:
            console.warn(`Unhandled action: ${request.action}`);
    }
    return true; // Keeps the message channel open for sendResponse
});

function isValidApiKey(key) {
    // Implement API key validation logic
    return /^[A-Za-z0-9_]+$/.test(key); // Basic alphanumeric check
}

function isValidDomain(domain) {
    // Implement domain validation logic
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain);
}

function createGoogleMeet(meetingName, authuser) {
    chrome.tabs.create({url: `https://meet.google.com/new?authuser=${authuser}&meeting_name=${meetingName}`}, (tab) => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {
                const observer = new MutationObserver((mutations) => {
                    const url = window.location.href;
                    if (!url.startsWith('https://meet.google.com/new')) {
                        chrome.runtime.sendMessage({action: 'meet-created', url: url});
                        observer.disconnect();
                    }
                });
                observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true
                });
            }
        });
    });
}

function shortenUrl(request, url) {
    const original_meet_url = url.split('?')[0];
    const meeting_name = url.split('meeting_name=')[1];
    const short_api_url = `https://api.godaddy.com/v1/domains/${domain}/records/CNAME/${meeting_name}`;
    const body = JSON.stringify({
        "data": original_meet_url,
        "ttl": 600
    });

    if (!API_KEY) {
        console.error("API Key not set");
        notifyUser("API Key not set. Please set the API key in the extension options.");
        return;
    }

    fetch(short_api_url, {
        method: "PUT",
        headers: {
            "Authorization": `sso-key ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: body
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((short_url) => {
        console.log("URL shortened successfully:", short_url);
        notifyUser(`Meet created and URL shortened: ${domain}/${meeting_name}`);
    })
    .catch(error => {
        console.error("Error shortening URL:", error);
        notifyUser("Failed to shorten URL. Please try again.");
    });
}

function notifyUser(message) {
    chrome.runtime.sendMessage({ action: 'notification', message: message });
}