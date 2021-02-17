require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(cors());
app.use(express.json()) // json body-parser parses request data into javascript and then places parsed data at req.body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content')) // morgan format string contain custom :content token

morgan.token('content', (req, res) => JSON.stringify(req.body)); // defining :content token

const port = process.env.PORT;

// connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to mongo'))
  .catch(() => console.log('something went wrong'));

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const { name, number } = body;

  if (!name || !number) {
    res.status(400).send('error: missing content');
  }
  const newPerson = new Person({
    name,
    number
  });
  newPerson.save()
    .then(data => {
      res.status(201).json(data)
    }); // res.sendStatus method sends status code, then automatically ends response (like how res.send sends the response and then ends it); res.status method only sends the status code 
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(data => res.json(data));
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then(data => { 
      res.json(data);
     });
})

app.get('/info', (req, res) => {
  const now = new Date();
  Person.countDocuments()
    .then(count => {
      res.send(`phonebook contains ${count} contacts -
      ${now.toDateString()}, ${now.toTimeString()}`);
    })
});

app.delete('/api/persons/:id', (req, res) => { 
  const id = req.params.id; // this id does not need to be parsed into a number. it's mongo id object and mongo can interpret it as is
  Person.deleteOne({ _id: id }) 
    .then(() => {
      res.sendStatus(204).end();
    });
})

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});