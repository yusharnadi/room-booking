// schemas.js
const Joi = require('joi');
const schemas = {
    BookPOST: Joi.object().keys({
        client: Joi.string().required(),
        usage_description: Joi.string().required(),
        room_id: Joi.number().required(),
    }),
    userRegister: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
    }),
    userLogin: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};
module.exports = schemas;
