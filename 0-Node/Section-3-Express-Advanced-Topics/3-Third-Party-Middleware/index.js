import joi from 'joi'
import log from '../1-Creating-Custom-Middleware/logger.js'
import authenticate from '../1-Creating-Custom-Middleware/auth.js'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
const app = express();
const Joi = joi

// Adding a piece of middleware for 'app' to use
app.use(express.json())
// Concatenates our key/value pair objects
app.use(express.urlencoded({
     extended: true
}))
// Serves our static files from the root
app.use(express.static('public'))

app.use(helmet())
// Logs the HTTP request that was made to the console
app.use(morgan('tiny'))

// Custom middleware
app.use(log)
app.use(authenticate)

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

// ===================================

// GET Request - Root (READ)
app.get('/', (req, res) => {
     res.send("Hello Willis")
})

// GET Request (READ)
app.get('/api/courses', (req, res) => {
     res.send(courses)
})

// Includes request parameters (READ/SHOW)
app.get('/api/courses/:id', (req, res) => {
     const foundCourse = courses.find(course => course.id === parseInt(req.params.id))
     if (!foundCourse) return res.status(404).send(`The course with ID ${req.params.id} was not found.`)
     res.send(foundCourse)
})

// POST Request (CREATE)
app.post('/api/courses', (req, res) => {
     const {
          error
     } = validateCourse(req.body);
     if (error) return res.status(400).send(error.details[0].message);

     if (error) return res.status(400).send(error.details[0].message)

     const course = {
          id: courses.length + 1,
          name: req.body.name
     }
     courses.push(course)
     res.send(courses)

})

// PUT Request (UPDATE)
app.put('/api/courses/:id', (req, res) => {
     // Look up the course 
     const foundCourse = courses.find(course => course.id === parseInt(req.params.id))
     if (!foundCourse) return res.status(404).send("We couldn't find that course")

     const {
          error
     } = validateCourse(req.body)
     if (error) return res.status(400).send(error.details[0].message);

     foundCourse.name = req.body.name
     res.send(foundCourse)

})

// DELETE Request (DELETE)
app.delete('/api/courses/:id', (req, res) => {
     const foundCourse = courses.find((course) => course.id === parseInt(req.params.id));
     if (!foundCourse) return res.status(404).send("We couldn't find that course");

     const index = courses.indexOf(foundCourse)
     courses.splice(index, 1)
     res.send(foundCourse)
})

// ===================================

const validateCourse = course => {
     const schema = Joi.object({
          name: Joi.string().min(3).required(),
     });
     return schema.validate(course);
}

// =============PORT==============
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))