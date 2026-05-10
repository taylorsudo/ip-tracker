exports.handler = async (event, context) => {
  // Extract the visitor's IP from Netlify's headers
  const clientIp = event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"];

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allows your Softr site to call this function
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ip: clientIp })
  };
};

