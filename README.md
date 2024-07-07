## How to Use

We've significantly revamped the user experience to make creating and managing your Google Meet links more intuitive and enjoyable. Here's how to get started with the new features:

1. Clone the repository.
2. Navigate to `chrome://extensions` or `edge://extensions` depending on your browser.
3. Enable developer mode.
4. Click on "Load unpacked" and select the project folder.
5. Open the extension. You'll be prompted for 3 inputs:
   - **GoDaddy API Key**: Generate one from [here](https://urlforwarding.api.godaddy.com/docs#/api-key/generateApiKey) or, if you want to work with `meet.sudipmondal.co.in`, you can obtain it from me.
     - If you work with your own API Key, update the domain name in `background.js` line no 2.
     - API key is just a one-time thing; you don't need to put it again.
   - **Authuser**: For multiple Google users (0 based index) in your browsers, you can choose which user will be the owner of the meet.
   - **Meeting Name**: It's the suffix of the URL. For example, if you choose `john-doe` as the meeting URL, the meet will be `meet.sudipmondal.co.in/john-doe`.

### New Features and UX Improvements

- **Interactive UI Elements**: We've added new interactive elements to the popup.html, making it easier to create and manage meetings.
- **Dynamic Content Loading**: Enjoy seamless experiences with AJAX calls for dynamic content loading without page refreshes.
- **Enhanced Styling**: With the addition of Bootstrap and Materialize CSS, the UI now looks modern and is responsive across devices.

### How to Leverage New Features

- Make sure to explore the new interactive elements added to the UI, such as form validation and dynamic content updates.
- Utilize the enhanced styling to experience the extension in a more visually appealing way.

### Showcasing the Upgraded UX

For a visual guide on how to use these new features, refer to the screenshots and GIFs included below:

![New UI Overview](link-to-screenshot)
![Creating a Meeting](link-to-gif)

## Accessing API Key from Maintainers

- Create an issue or choose an existing issue, get it assigned to you.
- Send an email to sudmondal2002@gmail.com mentioning your issue number that you need the API key.
