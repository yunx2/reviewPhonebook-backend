/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const contactsRouter = require('./controllers/contacts');
const middleware = require('./utils/middleware');
const app = express();

const options = { useNewUrlParser: true, useUnifiedTopology: true };
// connect to database
mongoose.connect(process.env.MONGO_URI, options)
  .then(() => console.log('connected to mongo'))
  .catch((error) => console.log('something went wrong', error.message));

app.use(cors());
// express.static would go here but i'm not serving static assets right now
app.use(express.json()); // json body-parser parses request data into javascript and then places parsed data at req.body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content')); // morgan format string contain custom :content token

morgan.token('content', (req, res) => JSON.stringify(req.body)); // defining :content token

app.use('/api/contacts', contactsRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;