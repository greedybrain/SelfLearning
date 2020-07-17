import express from 'express'
const homeRouter = express.Router();

// GET Request - Root (READ)
homeRouter.get('/', (req, res) => {
     res.render('index', {
          title: "My Express App",
          message: "Hello"
     })
})

export default homeRouter

