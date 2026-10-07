import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authorization API",
      version: "1.0.0",
      description: "Authentication API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
