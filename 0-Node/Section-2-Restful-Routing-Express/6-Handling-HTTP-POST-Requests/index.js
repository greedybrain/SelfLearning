import express from 'express'
const app = express();

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
     const course = {
          id: courses.length + 1,
          name: req.body.name
     }
     courses.push(course)
     res.send(courses)
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