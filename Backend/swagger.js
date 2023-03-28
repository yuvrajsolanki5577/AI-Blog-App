const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "AI Blog App API",
        description: "API Documentation for AI Blog APP"
    },
    host: "localhost:2800",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "Enter JWT token to get authenticate"
        }
    }
}

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);