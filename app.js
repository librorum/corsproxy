("use strict");

const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");
const fs = require("fs");

let recognizer = require("./PlateRecognizerManager");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
        credentials: true,
        additionalHeaders: ["cache-control", "x-requested-with"],
        headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
      }
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return {
        now: new Date(),
        name: "corsproxy"
      };
    }
  });

  server.route({
    method: "POST",
    path: "/proxy/{proxy_url*}",
    handler: async (request, h) => {
      console.log("proxy_url", JSON.stringify(request.params.proxy_url));
      console.log("upload: ", typeof request.payload.upload);
      let result = recognizer.recognize(request.payload.upload);
      return result;
    }
    // config: {
    //   cors: {
    //     origin: ["*"],
    //     credentials: true,
    //     additionalHeaders: ["cache-control", "x-requested-with"],
    //     headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
    //   }
    // }
  });

  server.route({
    method: "POST",
    path: "/plate-reader",
    config: {
      payload: {
        maxBytes: 600 * 1024 * 1024,
        output: "stream",
        parse: true,
        allow: "multipart/form-data"
      }
    },
    handler: async function(request, reply) {
      let image = request.payload.upload;
      fs.writeFileSync("test.jpg", image._data);
      return {
        result: "done"
      };
    }
  });
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
