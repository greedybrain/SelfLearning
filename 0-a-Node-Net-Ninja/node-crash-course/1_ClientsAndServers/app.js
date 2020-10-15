// NODE WITH EXPRESS FRAMEWORK 
const express = require('express');

// setup a express app 
const app = express();

// register view engine 
app.set('view engine', 'ejs');

// listen for requests 
app.listen(3000)

// routes 
app.get('/', (req, res) => {
        const blogs = [
                {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
                {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
                {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        ];
        res.render('index',  { title: 'Home', blogs })
})
app.get('/about', (req, res) => res.render('about', { title: 'About' }))
app.get('/blogs/create', (req, res) => res.render('create',  {title: 'Create new blog'}))

// redirects 
// app.get('/about-us', (req, res) => res.redirect('/about'))

// 404 page
app.use((req, res) => res.status(404).render('404', { title: '404' }))