import joi from 'joi'
import mongoose from 'mongoose'

const Joi = joi

export const Genre = mongoose.model('Genre', new mongoose.Schema({
     name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
     }
}))

export const validateGenre = genre => {
     const schema = Joi.object({
          name: Joi.string().min(5).required()
     })
     return schema.validate(genre)
}