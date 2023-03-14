const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Personal Assignment 6",
    description:
      "An application to get, update, and delete College Course and Instructor information from a database.",
  },
  host: "personalassignment6-t3uq.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
