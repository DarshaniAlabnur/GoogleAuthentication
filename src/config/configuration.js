const joi = require('joi');

//joi
const envVarsSchema = joi.object({
    NODE_ENV: joi.string().default('dev'),
    PORT: joi.number().default(8080),
    TOKEN_SECRET: joi.string().default('adsfsretgdfgdfgdfgfsdfsd'),
    MONGO_URL: joi.string().default('mongodb://localhost:27017/UserDetails'),
    PASSWORD: joi.string().default('successive'),
}).required();

const {value: envVars} = envVarsSchema.validate(process.env);

const configuration =  Object.freeze({
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    secret: envVars.TOKEN_SECRET,
    mongoUrl: envVars.MONGO_URL,
    password: envVars.PASSWORD,
});
// console.log('======', configuration);
module.exports = configuration;