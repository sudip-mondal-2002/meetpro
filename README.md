## How to Use

Clone the repository
Go to `chrome://extensions` or `edge://extensions` depending on your browser
Turn on developer mode
Click on Load unpacked
Select the project folder
Open the extension, you'll be promted for 3 inputs
  - Godaddy API Key: You can generate one from [here](https://developer.godaddy.com/doc/endpoint/domains#/v1/recordAdd) or if you want to work with `meet.sudipmondal.co.in`, you can obtain it from me.
    - If you work with your own API Key, update the domain name in `background.js` line no 2
    - API key is just a one time thing, you don't need to put it again
  - Authuser, for multiple google users(0 based index) in your browsers, you can choose which user will be the owner of the meet
  - Meeting name: It's the suffix of the url. For example if you choose `john-doe` as meeting url, the meet will be `john-doe.meet.sudipmondal.co.in`.


### New Features and UX Improvements

- **Interactive UI Elements**: We've added new interactive elements to the popup.html, making it easier to create and manage meetings.
- **Dynamic Content Loading**: Enjoy seamless experiences with AJAX calls for dynamic content loading without page refreshes.
- **Enhanced Styling**: With the addition of Bootstrap and Materialize CSS, the UI now looks modern and is responsive across devices.

### How to Leverage New Features

- Make sure to explore the new interactive elements added to the UI, such as form validation and dynamic content updates.
- Utilize the enhanced styling to experience the extension in a more visually appealing way.

- Create an issue or choose an existing issue, get it assigned to you.
- Send an email to sudmondal2002@gmail.com mentioning your issue number that you need the API key.
