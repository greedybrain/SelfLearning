const express = require('express');
const router = express.Router();
const { showBlogs, showBlog, createNewBlog, deleteBlog } = require('../controllers/blogsController')

/* ============= BEGIN ROUTES ============= */
router.get('/', (req, res) => res.redirect('/blogs'))
router.get('/blogs', (req, res) => showBlogs(res, 'index'))
router.get('/blogs/:id', (req, res) => showBlog(req, res))
router.get('/blogs/new', (req, res) => res.render('create', { title: 'Create' }))
router.post('/blogs', (req, res) => createNewBlog(req, res))
router.delete('/blogs/:id', (req, res) => deleteBlog(req.params.id, res))
/* ============= END OF ROUTES ============= */

module.exports = router;