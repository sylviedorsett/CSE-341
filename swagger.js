const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Personal Assignment 5",
    description:
      "An application to get, update, and delete College Course and Instructor information from a database.",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output";
const endpointsFile = ["./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFile, doc);
