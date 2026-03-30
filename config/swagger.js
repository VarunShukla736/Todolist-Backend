import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'Simple Todo API with Node.js + MongoDB'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
security: [
  {
    bearerAuth: [],
  },
],
  apis: ['./routes/*.js'], // where your routes are
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;