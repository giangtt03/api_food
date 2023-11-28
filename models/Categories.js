const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {type: String, require: true},
    value: {type: String, require: true},
    imageUrl: {type: String, require: true},

},{timestamps: false});

module.exports = mongoose.model('Category', categorySchema);