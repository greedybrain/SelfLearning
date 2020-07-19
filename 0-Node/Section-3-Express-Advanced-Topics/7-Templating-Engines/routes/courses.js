import express from 'express'
const router = express.Router();

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

// GET Request (READ)
router.get('/', (req, res) => {
     res.send(courses)
})

// Includes request parameters (READ/SHOW)
router.get('/:id', (req, res) => {
     const foundCourse = courses.find(course => course.id === parseInt(req.params.id))
     if (!foundCourse) return res.status(404).send(`The course with ID ${req.params.id} was not found.`)
     res.send(foundCourse)
})

// POST Request (CREATE)
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

export { router }