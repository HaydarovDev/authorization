import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Authorization API",
      version: "1.0.0",
      description:
        "Complete API documentation for authentication, user profiles, email verification, and avatar uploads.",
    },

    servers: [
      {
        url: "http://localhost:8080",
        description: "Local development",
      },
    ],

    tags: [
      { name: "Auth", description: "Registration and authentication" },
      { name: "Users", description: "User profile operations" },
      { name: "Avatar", description: "Avatar upload operations" },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter the access token returned by login.",
        },

        AccessTokenCookie: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
          description: "Access token stored in an HttpOnly cookie.",
        },

        RefreshTokenCookie: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
          description: "Refresh token stored in an HttpOnly cookie.",
        },
      },

      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "lastname", "email", "username", "password"],
          properties: {
            name: { type: "string", example: "Asadbek" },
            lastname: { type: "string", example: "Haydarov" },
            email: {
              type: "string",
              format: "email",
              example: "asadbek@example.com",
            },
            username: { type: "string", example: "asadbek" },
            password: {
              type: "string",
              format: "password",
              example: "StrongPassword123!",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "asadbek@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "StrongPassword123!",
            },
          },
        },

        UpdateProfileRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Asadbek" },
            lastname: { type: "string", example: "Haydarov" },
            username: { type: "string", example: "asadbek_dev" },
          },
          minProperties: 1,
        },

        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "671a1234567890abcdef1234" },
            name: { type: "string", example: "Asadbek" },
            lastname: { type: "string", example: "Haydarov" },
            email: {
              type: "string",
              format: "email",
              example: "asadbek@example.com",
            },
            username: { type: "string", example: "asadbek" },
            avatar: {
              type: "string",
              nullable: true,
              example: "unique-avatar.png",
            },
          },
        },

        ApiError: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: {
              type: "string",
              example: "Authentication required",
            },
          },
        },
      },
    },
  },

  // TS fayllaridagi Swagger izohlarini topadi.
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
