const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json()) // json body-parser parses request data into javascript and then places parsed data at req.body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
morgan.token('content', (req, res) => JSON.stringify(req.body));

const PORT = 3001;

let persons = [
  {
    "name": "Arto Hellas",
    "number": "asdf",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "777",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "555",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
];

const idGenerator = () => Math.floor(Math.random() * Math.floor(1000)) + 4;

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const { name, number } = body;

  if (!name || ! number) {
    res.status(400).send('error: missing content');
  }
  if (persons.find(p => p.name === name)) {
    res.status(400).send('name already in phonebook')
  }
  
  const newPerson = {
    ...body,
    id: idGenerator()
  }
  persons = persons.concat(newPerson);
  res.status(201).json(newPerson); // res.sendStatus method sends status code, then automatically ends response (like how res.send sends the response and then ends it); res.status method only sends the status code 
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = persons.find(p => p.id === id);
  res.json(data);
})

app.get('/info', (req, res) => {
  const now = new Date();
  res.send(`phonebook contains ${persons.length} contacts -
  ${now.toDateString()}, ${now.toTimeString()}`);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.sendStatus(204).end();
})

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});