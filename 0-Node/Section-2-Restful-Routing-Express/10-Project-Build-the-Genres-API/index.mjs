import allGenres from './routes/genres.mjs';
import home from './routes/home.mjs';
import express from 'express'
const app = express();

app.use(express.json())
app.use('/api/genres', allGenres)
app.use('/', home)

// SERVER LISTENER 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on PORT ${port}`))