import joi from 'joi'
import express from 'express'
const app = express();
const Joi = joi

app.use(express.json())

const genres = [
     { id: 1, name: "action" },
     { id: 2, name: "comedy" },
     { id: 3, name: "horror" },
]

// ROOT 
app.get('/', (req, res) => {
     res.send("Home")
})

// READ 
app.get('/api/genres', (req, res) => {
     res.send(genres)
})

// CREATE 
app.post('/api/genres', (req, res) => {
     const { error } = validateGenre(req.body)
     if (error) return res.status(400).send(error.details[0].message)

     const genre = {
          id: genres.length + 1,
          name: req.body.name
     }
     genres.push(genre)
     res.send(genre)
})

// READ/SHOW
app.get('/api/genres/:id', (req, res) => {
     res.send(findAndSetGenre(req, res))
})

// UPDATE
app.put('/api/genres/:id', (req, res) => {
     const foundGenre = findAndSetGenre(req, res)
     foundGenre.name = req.body.name
     res.send(foundGenre)
})

// DELETE
app.delete('/api/genres/:id', (req, res) => {
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

// SERVER LISTENER 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on PORT ${port}`))