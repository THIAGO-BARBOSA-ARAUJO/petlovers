import joi from "joi"

const schemaLogin = joi.object({
    email: joi.string()
    .email()
    .empty()
    .required(),
    
    password: joi.string()
    .empty()
    .required()
}).options({ abortEarly: false })


const schemaRegister = joi.object({
    email: joi.string()
    .email()
    .empty()
    .required(),
    
    password: joi.string()
    .alphanum()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .empty()
    .required(),
    
    name: joi.string()
    .required(),

    username: joi.string()
    .required()
    .empty()
}).options({ abortEarly: false })


export { schemaLogin, schemaRegister }
