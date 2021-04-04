const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLID
} = require('graphql');

const Author = require('../models/Author');
const Book = require('../models/Book');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                const author = Author.findById(parent.authorId);
                return author;
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({ authorId: parent.id });
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllBooks: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                const books = Book.find();
                return books;
            }
        },
        getBook: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }){
                // code to get data from db / other source
                // console.log(typeof id);
                const book = Book.findById(id);
                return book;
            }
        },
        getAllAuthors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                const authors = Author.find();
                return authors;
            }
        },
        getAuthor: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }){
                const author = Author.findById(id);
                return author;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, { name, age }){
                const author = Author.create({ name, age });
                return author;
            }
        },
        createBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, { name, genre, authorId }){
                const book = Book.create({
                    name,
                    genre,
                    authorId
                });

                return book;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});