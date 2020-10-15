// NODE WITH EXPRESS FRAMEWORK 
const express = require('express');

// setup a express app 
const app = express();

// register view engine 
app.set('view engine', 'ejs');

// listen for requests 
app.listen(3000)

// routes 
app.get('/', (req, res) => res.sendFile('./views/index.html', { root: __dirname }))
app.get('/about', (req, res) => res.sendFile('./views/about.html', { root: __dirname }))

// redirects 
app.get('/about-us', (req, res) => res.redirect('/about'))

// 404 page
app.use((req, res) => res.status(404).sendFile('./views/404.html', { root: __dirname }))