import allGenres from './routes/genres.mjs';
import allCustomers from './routes/customers.mjs';
import home from './routes/home.mjs';
import mongoose from 'mongoose'
import express from 'express'
const app = express();

app.use(express.json())
app.use('/api/genres', allGenres)
app.use('/api/customers', allCustomers)
app.use('/', home)

mongoose.connect('mongodb://localhost/vidly', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
})
     .then(console.log("Connected to mongo db"))
     .catch(err => console.log(err.message))


// SERVER LISTENER 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on PORT ${port}`))