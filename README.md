# IP Tracker
A simple tool for fetching IP addresses from web form submissions.

## Setup
1. Clone this repo: `git clone git@github.com:taylorsudo/ip-tracker.git`
2. Define the `netlifyURL` and `inputName` in `/netlify/functions/get-ip.js`
3. Push the repo to GitHub and [deploy it to Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
4. Use your Netlify URL in the below script and add it before the closing `</body>` tag on your webpage

```html
<script>
document.addEventListener("DOMContentLoaded", function() {
    // Define input field name below
    const netlifyURL = "https://example.netlify.app/"
    const inputName = "IP address";

    async function injectIP() {
        try {
            // Fetch IP from Netlify Function
            const response = await fetch(netlifyURL);
            const data = await response.json();
            const visitorIP = data.ip;

            // Wait a moment for webpage to render
            setTimeout(() => {
                // Find input field by label name (case sensitive)
                const inputField = document.querySelector('input[name="${inputName}"]');

                if (inputField) {
                    inputField.value = visitorIP;
                    console.log("IP successfully injected into input field.");
                } else {
                    console.warn("Could not find the input field.");
                }
            }, 1000); // 1-second delay to ensure webpage is loaded

        } catch (error) {
            console.error("Error grabbing IP:", error);
        }
    }

    injectIP();
});
</script>
```
