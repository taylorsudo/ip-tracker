exports.handler = async (event, context) => {
  const domain = "softr.app"; // Define domain of webpage here
  const origin = event.headers.origin || "";

  const headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS"
  };

  if (
    origin === `https://${domain}` ||
    origin.endsWith(`.${domain}`)
  ) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  const ip =
    event.headers["x-nf-client-connection-ip"] ||
    event.headers["x-forwarded-for"];

  const country =
    event.headers["x-nf-geo-country"] ||
    event.headers["x-country"];

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      ip,
      country
    })
  };
};
