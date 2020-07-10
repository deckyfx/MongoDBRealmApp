exports = async ({ token, tokenId, username, password }) => {
  // do not confirm the user
  return new Promise(async (resolve, reject) => {
    try {
      const response = await context.http.get({ 
        url: `https://df1412-simple-webhook.glitch.me/webhook3?username=${username}&password=${password}&token=${token}&tokenId=${tokenId}` 
      });
      // The response body is a BSON.Binary object. Parse it and return.
      const responseData = EJSON.parse(response.body.text());
      resolve({ status: 'success' });
    } catch (e) {
      reject(e)
    }
  })
};
