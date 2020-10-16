const Blog = require('../models/blog');

/* ============= BEGIN BLOGS CONTROLLER ============= */
const showBlogs = async (res, view) => {
        await Blog.find().sort({ createdAt: -1 })
                .then(blogs => res.render(view, {
                        blogs,
                        title: 'Blogs'
                }))
                .catch(err => console.log(err))
}

const createNewBlog = async (req, res) => {
        let blog = new Blog(req.body)
        await blog.save()
                .then(blog => {
                        res.redirect('/blogs')
                        console.log(blog)
                })
                .catch(err => console.log(err))
}

const showBlog = async (req, res) => {
        await Blog.findById(req.params.id)
                .then(blog => res.render('show', {blog }))
                .catch(err => console.log(err))
}

const deleteBlog = async (id, res) => {
        await Blog.findByIdAndDelete(id)
                .then(blog => res.send({
                        blog,
                        message: `Blog with ID# ${blog._id} has been deleted successfully`
                }))
                .catch(err => console.log(err))
}
/* ============= END OF BLOGS CONTROLLER ============= */

module.exports = { showBlogs, createNewBlog, showBlog, deleteBlog }