import joi from 'joi'
import express from 'express'
const allGenres = express.Router()
const Joi = joi

const genres = [{
          id: 1,
          name: "action"
     },
     {
          id: 2,
          name: "comedy"
     },
     {
          id: 3,
          name: "horror"
     },
]

// READ
allGenres.get('/', (req, res) => {
     res.send(genres)
})

// CREATE 
allGenres.post('/', (req, res) => {
     const {
          error
     } = validateGenre(req.body)
     if (error) return res.status(400).send(error.details[0].message)

     const genre = {
          id: genres.length + 1,
          name: req.body.name
     }
     genres.push(genre)
     res.send(genre)
})

// READ/SHOW
allGenres.get('/:id', (req, res) => {
     res.send(findAndSetGenre(req, res))
})

// UPDATE
allGenres.put('/:id', (req, res) => {
     const foundGenre = findAndSetGenre(req, res)
     foundGenre.name = req.body.name
     res.send(foundGenre)
})

// DELETE
allGenres.delete('/:id', (req, res) => {
     const genre = genres.find(genre => genre.id == req.params.id)
     const index = genres.indexOf(genre)
     genres.splice(index, 1)
     res.send(genre)
})

// HELPERS 
const findAndSetGenre = (req, res) => {
     const foundGenre = genres.find(genre => genre.id == req.params.id)
     if (!foundGenre) return res.status(404).send("We couldn't find that genre")
     return foundGenre
}

const validateGenre = genre => {
     const schema = Joi.object({
          name: Joi.string().min(5).required()
     })
     return schema.validate(genre)
}

export default allGenres