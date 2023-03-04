const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'An API to GET, PUT, POST, and DELETE contacts from a database.'
  },
  host: 'personalassignment4-c7zu.onrender.com',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./backend/routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
