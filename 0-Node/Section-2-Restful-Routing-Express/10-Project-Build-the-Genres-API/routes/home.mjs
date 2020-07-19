import express from 'express'
const home = express.Router()

// ROOT
home.get('/', (req, res) => {
     res.send("Home")
})

export default home