import * as Joi from "@hapi/joi";

const validationSchema = Joi.object({
    PORT: Joi.number().required(),
    DATABASE_HOSTNAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
});

export default validationSchema;
