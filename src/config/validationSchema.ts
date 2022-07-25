import * as Joi from "@hapi/joi";

/**
//  * .env validation schema
 */
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
    EMAIL_SERVICE: Joi.string().required(),
    EMAIL_USER: Joi.string().required(),
    EMAIL_PASSWORD: Joi.string().required(),
});

export default validationSchema;
