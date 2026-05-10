# IP Tracker
A simple tool for fetching IP addresses from web form submissions.

## Setup
1. Clone this repo: `git clone git@github.com:taylorsudo/ip-tracker.git`
2. Define the `netlifyURL` in `/netlify/functions/get-ip.js`
3. Push the repo to GitHub and [deploy it to Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
4. Use your Netlify URL and field names in the below script, and add it before the closing `</body>` tag on your webpage

```html
<script>
document.addEventListener("DOMContentLoaded", function () {
    const netlifyURL =
        "https://example.netlify.app/.netlify/functions/get-ip";

    const ipFieldName = "IP address";
    const countryFieldName = "Country";

    async function injectData() {
        try {
            const response = await fetch(netlifyURL);
            const data = await response.json();

            const visitorIP = data.ip;
            const visitorCountry = data.country;

            setTimeout(() => {
                const ipField = document.querySelector(
                    `input[name="${ipFieldName}"]`
                );

                const countryField = document.querySelector(
                    `input[name="${countryFieldName}"]`
                );

                if (ipField) {
                    ipField.value = visitorIP;
                    ipField.dispatchEvent(
                        new Event("input", { bubbles: true })
                    );
                    console.log("IP injected.");
                } else {
                    console.warn("IP field not found.");
                }

                if (countryField) {
                    countryField.value = visitorCountry;
                    countryField.dispatchEvent(
                        new Event("input", { bubbles: true })
                    );
                    console.log("Country injected.");
                } else {
                    console.warn("Country field not found.");
                }
            }, 1000);
        } catch (error) {
            console.error("Error grabbing data:", error);
        }
    }

    injectData();
});
</script>
```
