// schemas.js
const Joi = require('joi');
const schemas = {
  BookPOST: Joi.object().keys({
    client: Joi.string().required(),
    usage_description: Joi.string().required(),
    room_id: Joi.number().required(),
  }),
  userRegister: Joi.object().keys({
    client: Joi.string().required(),
    usage_description: Joi.string().required(),
    room_id: Joi.number().required(),
  }),
  userLogin: Joi.object().keys({
    client: Joi.string().required(),
    usage_description: Joi.string().required(),
    room_id: Joi.number().required(),
  }),
};
module.exports = schemas;
