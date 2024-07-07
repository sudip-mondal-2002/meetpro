let API_KEY
let domain = "meet.sudipmondal.co.in"
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'create-meet') {
        createGoogleMeet(request.meeting_name, request.authuser)
    } else if (request.action === 'meet-created') {
        shortenUrl(request, sender.tab.url)
    } else if (request.action === 'set-api-key') {
        API_KEY = request.apiKey;
    }
    // Implement new background tasks as needed to support enhanced UX
});

function createGoogleMeet(meetingName, authuser) {
    chrome.tabs.create({url: `https://meet.google.com/new?authuser=${authuser}&meeting_name=${meetingName}`}, (tab) => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {
                // On page URL change, check if the URL is the Google Meet creation page
                const observer = new MutationObserver((mutations) => {
                    const url = window.location.href
                    if (!url.startsWith('https://meet.google.com/new')) {
                        chrome.runtime.sendMessage({action: 'meet-created'});
                        observer.disconnect();
                    }
                });

                observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true
                });
            }
        });
    })
    // Modify to support new features from popup.js
}

function shortenUrl(request, url){
    const original_meet_url = url.split('?')[0]
    const meeting_name = url.split('meeting_name=')[1]
    const short_api_url = `https://urlforwarding.api.godaddy.com/v1/?apikey=${API_KEY}&domain=${domain}&url=${original_meet_url}`
    const body = new FormData()
    body.append('code', meeting_name)
    console.log(short_api_url)

    fetch(short_api_url, {
        method: "PUT",
        body: body
    }).then(res=>res.json())
        .then((short_url) =>{
            // Add error handling for API calls and user feedback mechanisms
        })
        .catch(console.error) // Improved error handling
}
