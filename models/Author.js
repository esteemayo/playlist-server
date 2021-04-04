const { Schema, model } = require('mongoose');

const authorSchema = new Schema({
    name: String,
    age: Number
});

const Author = model('Author', authorSchema);

module.exports = Author;