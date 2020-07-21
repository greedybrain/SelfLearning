import joi from 'joi'
import mongoose from 'mongoose'
const Joi = joi

export const Customer = mongoose.model('Customer', new mongoose.Schema({
     name: {
          type: String,
          minlength: 4,
     },
     phone: {
          type: String,
          minlength: 5,
     },
     isGold: {
          type: Boolean,
          default: false
     }
}))

export const validateCustomer = customer => {
     const schema = Joi.object({
          name: Joi.string().min(5).required(),
          phone: Joi.string().min(5).max(5).required(),
          isGold: Joi.boolean()
     })
     return schema.validate(customer)
}