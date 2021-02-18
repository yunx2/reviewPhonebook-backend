const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get('/', (req, res) => {
  Person.find({})
    .then(data => res.json(data));
});

personsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then(data => { 
      if (data) {
        res.json(data);
      } else {
        res.sendStatus(404);
      }
    });
});

personsRouter.post('/', (req, res) => {
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

personsRouter.delete('/:id', (req, res) => { 
  const id = req.params.id; // this id does not need to be parsed into a number. it's mongo id object and mongo can interpret it as is
  Person.deleteOne({ _id: id }) 
    .then(() => {
      res.sendStatus(204);
    });
});

personsRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const { update } = req.body;
  Person.findByIdAndUpdate(id, update, { new: true })
    .then(data => res.json(data));
});

module.exports = personsRouter;