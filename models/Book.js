const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

const Book = model('Book', bookSchema);

module.exports = Book;