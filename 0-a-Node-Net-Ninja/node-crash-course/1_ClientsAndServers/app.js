//! NODE WITH EXPRESS FRAMEWORK 
const express = require('express');
//! Morgan middleware library
const morgan = require('morgan');
const mongoose = require('mongoose');

//! setup a express app 
const app = express();

//! connect to mongodb
const dbURI = 'mongodb+srv://gb18:password1234@mongo-learning.lhqxa.mongodb.net/gb18?retryWrites=true&w=majority'
mongoose.connect(dbURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
        })
        .then(() => {
                app.listen(3000)
                console.log('connected to db')
        })
        .catch(err => console.log(err))

//! register view engine 
app.set('view engine', 'ejs');

//! middleware (runs synchronously) / //! middleware & static files
app.use(express.static('public'))
app.use(morgan('dev')) //logs info to console

// routes 
app.get('/', (req, res) => {
        const blogs = [{
                        title: 'Yoshi finds eggs',
                        snippet: 'Lorem ipsum dolor sit amet consectetur'
                },
                {
                        title: 'Mario finds stars',
                        snippet: 'Lorem ipsum dolor sit amet consectetur'
                },
                {
                        title: 'How to defeat bowser',
                        snippet: 'Lorem ipsum dolor sit amet consectetur'
                },
        ];
        res.render('index', {
                title: 'Home',
                blogs
        })
})
app.get('/about', (req, res) => res.render('about', {
        title: 'About'
}))
app.get('/blogs/create', (req, res) => res.render('create', {
        title: 'Create new blog'
}))

// redirects 
// app.get('/about-us', (req, res) => res.redirect('/about'))

// 404 page
app.use((req, res) => res.status(404).render('404', {
        title: '404'
}))