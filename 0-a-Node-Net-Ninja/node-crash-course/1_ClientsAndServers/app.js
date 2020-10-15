//! NODE WITH EXPRESS FRAMEWORK 
const express = require('express');
//! Morgan middleware library
const morgan = require('morgan');


//! setup a express app 
const app = express();

//! register view engine 
app.set('view engine', 'ejs');

//! listen for requests 
app.listen(3000)

//! middleware (runs synchronously)
// app.use((req, res, next) => {
//         console.log('new request made')
//         console.log('host: ', req.hostname)
//         console.log('path:  ', req.path)
//         console.log('method: ', req.method)
//         next()
// })

// app.use((req, res, next) => {
//         console.log('in the next middleware')
//         next()
// })

app.use(morgan('dev'))

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