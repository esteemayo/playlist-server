const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// Database local
const db = process.env.DATABASE.replace(
        '<DATABASE_PASSWORD>',
        process.env.PASSWORD
    );

// MongoDB Atlas
const dbLocal = process.env.DATABASE_LOCAL;

// MongoDB connection
mongoose.connect(db, {
// mongoose.connect(dbLocal, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log(`Connected to MongoDB → ${db}`));
    // .then(() => console.log(`Connected to MongoDB → ${dbLocal}`));

const PORT = process.env.PORT || 4040;

const server = app.listen(PORT, () => console.log(`App listening on port → ${PORT}`));

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});