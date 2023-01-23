const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: '3.0.0',
      servers : [
        {
            url : "http://localhost:2800"
        }
      ],
      info: {
        title: 'AI Blog App API',
        version: '1.0.0',
        description : "AI Blog App is An Hybrid Application Works on Both Mobile Devices and Web !!",
        contact : {
            name : "Shubham Jain",
            email : "shubhamjainpvt28@gmail.com"
        }
      },
    },
    apis: ["./routers/*.js"], // files containing annotations as above
  };

const swaggerDocs = swaggerJSDoc(options);
module.exports = swaggerDocs;