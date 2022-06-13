const md5 = require("md5");
const axios = require("axios");
const ENV = require("../../hush.js");
const apikey = ENV.MARVEL_API_KEY;
const private_key = ENV.MARVEL_PRIVATE_KEY;
const random = Math.floor(Math.random() * 738);

// md520480284824n230475035923749724243
exports.handler = async function (event, context) {
  let hash = md5(random + private_key + apikey);
  let response;
    response = await axios({
      url: `http://gateway.marvel.com/v1/public/comics?ts=${random}&hash=${hash}&apikey=${apikey}`,
      method: "get",
    });
  response = response.data.data.results
  console.log("From Marvel: ", response[0].id)

  return {
    statusCode: 201,
    body: JSON.stringify({
      message:
        "Hello World! (outside src, inside dot folder-- reading a sibling function)",
      data: response[0].id,
      event,
      context,
    }),
  };
};
