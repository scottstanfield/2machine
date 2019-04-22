const express = require('express');
const app = express();
const morgan = require('morgan');

require('dotenv').config();
const port = process.env.PORT || 8080;

// setup logging maybe
process.env.LOGGER && app.use(morgan(process.env.LOGGER));

// trust the nginx proxy
app.set('trust proxy', true);

// only route
app.get('/', (req, res) => {
    res.send(`Hi Ben! I got HTTPS working: crazy stuff. Running express on ${port}`);
})

app.listen(port, () => {
    console.log(`Running on ${port}.`);
})


