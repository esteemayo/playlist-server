const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

// Models
const Author = require('../../models/Author');
const Book = require('../../models/Book');

dotenv.config({ path: './config.env' });

// Database local
const dbLocal = process.env.DATABASE_LOCAL;

// MongoDB Atlas
const db = process.env.DATABASE.replace('<DATABASE_PASSWORD>', process.env.PASSWORD);

// MongoDB connection
mongoose.connect(db, {
// mongoose.connect(dbLocal, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log(`Conneted to MongoDB -→ ${db}`))
    // .then(() => console.log(`Conneted to MongoDB -→ ${dbLocal}`))
    .catch(err => console.error(err));

// Read JSON file
const authors = JSON.parse(fs.readFileSync(`${__dirname}/authors.json`, 'utf-8'));
const books = JSON.parse(fs.readFileSync(`${__dirname}/books.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
    try {
        await Author.create(authors);
        await Book.create(books);

        console.log('Data successfully loaded 👍💯');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

// Delete all data in the DB
const deleteData = async () => {
    try {
        console.log('😢😢 Goodbye Data...');

        await Author.deleteMany();
        await Book.deleteMany();

        console.log('Data successfully deleted! To load sample data, run\n\n\t npm run sample\n\n');
        process.exit();
    } catch (err) {
        console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
        console.log(err);
        process.exit()
    }
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}