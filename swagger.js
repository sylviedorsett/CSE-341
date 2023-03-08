const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Personal Assignment 5",
    description:
      "An application to get, update, and delete College Course and Instructor information from a database.",
  },
  host: "localhost:3000",
  schemes: ["https"],
};

const outputFile = "./swagger-output";
const endpointsFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
