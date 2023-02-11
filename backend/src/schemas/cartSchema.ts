import joi from "joi";

const schemaAddCart = joi
  .object({
    name: joi.string().required(),
    img_url: joi.string().required(),
    price: joi.number().required(),
    quantity: joi.number().required(),
    stock: joi.number().required()
  })
  .options({ abortEarly: false });


export { schemaAddCart };