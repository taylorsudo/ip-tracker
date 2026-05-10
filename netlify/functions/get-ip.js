exports.handler = async (event, context) => {
  // Define domain of webpage
  const domain = "softr.app"
  const origin = event.headers.origin || "";
  
  // Define the security headers
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS"
  };

  // Check if the origin ends with defined domain
  if (origin === `https://${domain}`) || origin.endsWith(`.${domain}`)) {
    headers["Access-Control-Allow-Origin"] = origin;
  } else {
    // Allow local testing
    // headers["Access-Control-Allow-Origin"] = "http://localhost:8080";
  }

  // Handle Preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const clientIp = event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"];

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ip: clientIp })
  };
};
