import swaggerJsdoc from'swagger-jsdoc';


const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My REST API',
      version: '1.0.0',
    },
  },
  apis: ['../routes/index.ts'], // Replace with the path to your API code
};

const specs = swaggerJsdoc(options);

module.exports = specs;
