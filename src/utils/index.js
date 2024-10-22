function isBase64DataUrl(str) {
  // Regular expression to match the pattern of a Base64-encoded data URL
  const base64DataUrlPattern =
    /^data:image\/[a-zA-Z]*;base64,([a-zA-Z0-9+/]+={0,2})$/;
  return base64DataUrlPattern.test(str);
}

async function decodeBase64Image(dataString) {
  return new Promise((resolve, reject) => {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const response = {};

    if (matches && matches.length === 3) {
      response.type = matches[1];
      response.data = Buffer.from(matches[2], "base64");
      resolve(response);
    } else {
      reject(new Error("Invalid input string"));
    }
  });
}

module.exports = { isBase64DataUrl, decodeBase64Image };
