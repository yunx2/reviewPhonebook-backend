const express = require('express');
const app = express();

const PORT = 3001;

const persons = {
  "persons": [
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
  ]
};


app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const now = new Date();
  res.send(`phonebook contains ${persons.persons.length} contacts -
  ${now.toDateString()}, ${now.toTimeString()}`);
})

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});