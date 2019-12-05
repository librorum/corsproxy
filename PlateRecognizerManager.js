var request = require("request-promise-native");
const axios = require("axios");
const FormData = require("form-data");
const apiKey = "c988744e5554fd81ca0fe717fc61b37a2b1eb2dd";

// axios.defaults.proxy = {
//   host: "127.0.0.1",
//   port: 9090
// };

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const url = "https://api.platerecognizer.com/v1/plate-reader";
//const url = "http://localhost:3000/plate-reader";
exports.recognize = async data => {
  try {
    let formData = new FormData();
    console.log("data", typeof data, data.length);
    formData.append("upload2", data, { filename: "plate.jpg" });

    let options = {
      method: "POST",
      uri: url,
      formData: {
        upload: {
          value: data,
          options: {
            filename: "plate.jpg",
            contentType: "image/jpg"
          }
        }
      },
      headers: {
        Authorization: "Token c988744e5554fd81ca0fe717fc61b37a2b1eb2dd",
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*"
        // "Accept-Encoding": "gzip, deflate",
        // "cache-control": "no-cache"
      },
      json: true
    };
    let result = await request(options);
    // console.log("result: ", result, typeof result);
    return result;
  } catch (error) {
    console.log("recognize exception: ", JSON.stringify(error, null, 4));
    return error.response.data;
  }
};
// exports.recognize = async data => {
//   try {
//     let formData = new FormData();
//     console.log("data", typeof data, data.length);
//     console.dir(Buffer.isBuffer(data));
//     formData.append("upload2", data, { filename: "plate.jpg" });
//     let headers = {
//       Authorization: "Token c988744e5554fd81ca0fe717fc61b37a2b1eb2dd",
//       "Content-Type": "multipart/form-data",
//       "Access-Control-Allow-Origin": "*"
//       // "Accept-Encoding": "gzip, deflate",
//       // "cache-control": "no-cache"
//     };
//     let result = await axios.post(url, formData, { headers: formData.getHeaders(headers) });
//     // let result = await axios.get("https://www.google.com");
//     return result.data;
//     console.log("result: ", result.data);
//   } catch (error) {
//     console.log("recognize exception: ", JSON.stringify(error, null, 4));
//     return error.response.data;
//   }
// };
