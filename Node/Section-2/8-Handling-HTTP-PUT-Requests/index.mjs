import joi from 'joi'
import express from 'express'
const app = express();
const Joi = joi

// Adding a piece of middleware for 'app' to use
app.use(express.json())

const courses = [{
          id: 1,
          name: "course1",
     },
     {
          id: 2,
          name: "course2",
     },
     {
          id: 3,
          name: "course3",
     },
];

// GET Request - Root 
app.get('/', (req, res) => {
     res.send("Hello Willis")
})

// GET Request
app.get('/api/courses', (req, res) => {
     res.send(courses)
})

// POST Request 
app.post('/api/courses', (req, res) => {
     const schema = Joi.object({
          name: Joi.string().min(3).required()
     })
     const result = schema.validate(req.body)
     console.log(result.error)
     if (result.error) {
          //400 Bad Request
          res.status(400).send(result.error.details[0].message)
          return;
     } else {
          const course = {
               id: courses.length + 1,
               name: req.body.name
          }
          courses.push(course)
          res.send(courses)
     }
})

app.put('/api/courses/:id', (req, res) => {
     // Look up the course 
     const foundCourse = courses.find(course => course.id === parseInt(req.params.id))
     // If does not exist, return 404
     if (!foundCourse) res.status(404).send("We couldn't find that course")
     // Validate
     // If invalid, return 400 - Bad Request

     // Update course
     // Return the updates course
})

// Includes request parameters 
app.get('/api/courses/:id', (req, res) => {
     const foundCourse = courses.find(course => course.id === parseInt(req.params.id))
     if (!foundCourse) res.status(404).send(`The course with ID ${req.params.id} was not found.`)
     else res.send(foundCourse)
})

// =============PORT==============
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))