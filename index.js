const express = require('express');
const Middleware = require('./middleware');
const morgan = require('morgan');
const DB = require('./database/index');
const dbSync = require('./database/syncDB');

// Init express
const app = express();

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
// CORS
app.use(Middleware.cors)

// Routing
app.use('/api', require('./api/index'));
// app.use('/', );

// Catch 404
app.use((req, res, next) => res.status(404).send('404 - Not Found'))

// Just to know it
console.log('\x1b[36m%s\x1b[0m', '✓ App is now fully running', );

module.exports = app;