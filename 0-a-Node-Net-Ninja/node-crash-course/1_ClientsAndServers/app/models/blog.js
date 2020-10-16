const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//! defines structure of documents 
const blogSchema = new Schema({
        title: {
                type: String,
                required: true
        },
        snippet: {
                type: String,
                required: true
        },
        body: {
                type: String,
                required: true
        }
}, {
        timestamps: true
});

//! model surrounds and provides us with interface to communicate with database 
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog