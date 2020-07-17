import express from 'express'
const app = express();

const courses = [
     {
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

app.get('/', (req, res) => {
     res.send("Hello Willis")
})

app.get('/api/courses', (req, res) => {
     res.send(courses)
})

// Includes request parameters 
app.get('/api/courses/:id', (req, res) => {
     const foundCourse = courses.find(course => course.id === parseInt(req.params.id))
     res.send(foundCourse)
})

// =============PORT==============
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))