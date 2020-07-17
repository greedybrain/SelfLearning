import joi from 'joi'
import helmet from 'helmet'
import homeRouter from './routes/home';
import coursesRouter from './routes/courses';
import express from 'express'
const app = express();
const Joi = joi

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', coursesRouter)
app.use('/', homeRouter)

// =============PORT==============
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))