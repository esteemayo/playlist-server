const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

// Set security http headers
app.use(helmet());

app.use(cors());

// Acess-Control-Allow-Origin
app.options('*', cors());

// Data sanitization against nosql query injection
app.use(mongoSanitize());

// Data sanitize against xss
app.use(xss());

// Compression
app.use(compression());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

module.exports = app;