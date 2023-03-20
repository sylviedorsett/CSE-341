const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Personal Assignment 8",
    description:
      "An application to get, update, and delete College Course and Instructor information from a database.",
  },
  host: "personalassignment8-udc9.onrender.com",
  schemes: ["https"],
  securityDefinitions: {
    oAuthSample: {
      type: "oauth2",
      authorizationUrl:
        "https://personalassignment8-udc9.onrender.com/api-docs/personalassignment8-udc9.onrender.com/login",
      flow: "implicit",
      scopes: {
        read_docs: "read your database collections",
        write_docs: "modify collections in your database",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
