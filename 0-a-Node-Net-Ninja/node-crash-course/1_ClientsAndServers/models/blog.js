const mongoose = require('mongoose');
const Schema = mongoose.Schema;

define m
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