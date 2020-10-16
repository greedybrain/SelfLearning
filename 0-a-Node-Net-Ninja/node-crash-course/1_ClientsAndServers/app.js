//! NODE WITH EXPRESS FRAMEWORK 

/* ============= BEGIN IMPORTS ============= */
//! installed/built in libraries
const morgan = require('morgan');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const express = require('express');
const app = express();
//! custom imports
const blogRoutes = require('./app/routes/blogRoutes')
/* ============= END OF IMPORTS ============= */


/* ============= BEGIN ENGINE SETUP ============= */
app.set('views', './app/views')
app.set('view engine', 'ejs');
/* ============= END OF ENGINE SETUP ============= */

/* ============= BEGIN MIDDLEWARE SETUP ============= */
app.use(express.static('public'))
app.use(morgan('dev')) //logs info to console
app.use(urlencoded({ extended: true }))
app.use(blogRoutes)
/* ============= END OF MIDDLEWARE SETUP ============= */

/* ============= BEGIN DB CONNECTION SETUP ============= */
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
/* ============= END OF DB CONNECTION SETUP ============= */

// routes 
// app.get('/', (req, res) => {
//         const blogs = [{
//                         title: 'Yoshi finds eggs',
//                         snippet: 'Lorem ipsum dolor sit amet consectetur'
//                 },
//                 {
//                         title: 'Mario finds stars',
//                         snippet: 'Lorem ipsum dolor sit amet consectetur'
//                 },
//                 {
//                         title: 'How to defeat bowser',
//                         snippet: 'Lorem ipsum dolor sit amet consectetur'
//                 },
//         ];
//         res.render('index', {
//                 title: 'Home',
//                 blogs
//         })
// })
app.get('/about', (req, res) => res.render('about', {title: 'About'}))
app.get('/about-us', (req, res) => res.redirect('/about'))

// 404 page
app.use((req, res) => res.status(404).render('404', {
        title: '404'
}))