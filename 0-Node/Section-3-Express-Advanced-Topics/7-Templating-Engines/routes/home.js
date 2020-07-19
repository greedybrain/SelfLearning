import express from 'express'
const router = express.Router();

// GET Request - Root (READ)
router.get('/', (req, res) => {
     res.render('index', {
          title: "My Express App",
          message: "Hello"
     })
})

export { router }

