import { Genre, validateGenre } from '../models/genres.mjs'
import express from 'express'
const allGenres = express.Router()

// READ
allGenres.get('/', async (req, res) => {
     const genres = await Genre.find().sort('name')
     res.send(genres)
})

// CREATE 
allGenres.post('/', async (req, res) => {
     const { error } = validateGenre(req.body)
     if (error) return res.status(400).send(error.details[0].message)

     let genre = new Genre({ name: req.body.name })
     genre = await genre.save()
     res.send(genre)
})

// READ/SHOW
allGenres.get('/:id',async  (req, res) => {
     const genre = await Genre.findById(req.params.id)

     if (!genre) return res.status(404).send("We couldn't find that genre")
     res.send(genre)
})

// UPDATE
allGenres.put('/:id', async (req, res) => {
     const { error } = validateGenre(req.body)
     if (error) return res.status(400).send(error.details[0].message)

     const genre = await Genre.findByIdAndUpdate(
          req.params.id,
          { name: req.body.name },
          { new: true }
     )

     if (!genre) return res.status(404).send("We couldn't find that genre")
     res.send(genre)
})

// DELETE
allGenres.delete('/:id', async (req, res) => {
     const genre = await Genre.findByIdAndRemove(req.params.id)

     if (!genre) return res.status(404).send("We couldn't find that genre")
     res.send(genre)
})

export default allGenres