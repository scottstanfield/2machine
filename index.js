const express = require('express');
const morgan  = require('morgan');
const cors    = require('cors');
const app     = express();
const pino    = require('express-pino-logger')()

app.use(pino);

// Runtime config from .env file
require('dotenv').config();
const port = process.env.PORT || 8080;

// Setup logger
// process.env.LOGGER && app.use(morgan(process.env.LOGGER));

// Trust the nginx proxy
app.set('trust proxy', true);

// Setup CORS
app.use(cors());


// Our only route
app.get('/', (req, res) => {
    req.log.info('something');
    res.send(`Hi Ryan! I got HTTPS working: crazy stuff. Running express on ${port}`);
})

app.get('/products/:id', (req, res) => {
    req.params.id == 42 && req.log.warn('UHOH')
    res.json({msg: 'This is CORS-enabled', id: req.params.id})
})

app.get('/error', (req, res, next) => {
    next(new Error('kaboom'));
})

// Catch-all error handler
app.use((err, req, res, next) => {
    req.log.error(err);
    res.statusCode = 500;
    res.end('error');
});

// Start listning
app.listen(port, () => {
    console.log(`Running on ${port}.`);
})
