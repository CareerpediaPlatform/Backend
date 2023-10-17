import swaggerJsdoc from'swagger-jsdoc';
import routes from '../routes/v1/admin/adminAuth'


const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CAREERPEDIA API',
      version: '1.0.0',
    },
  },
  apis: ['../routes/v1/admin/adminAuth'], // Replace with the path to your API code
};

// Generate the Swagger specification
const swaggerSpecification = swaggerJsdoc(options);

export { swaggerSpecification };