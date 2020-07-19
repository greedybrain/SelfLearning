import joi from 'joi'
import helmet from 'helmet'
import express from 'express'
import { router as home } from './routes/home.js'
import { router as courses } from './routes/courses.js'
const app = express();
const Joi = joi

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home)

// =============PORT==============
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))