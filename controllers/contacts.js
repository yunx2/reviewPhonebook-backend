const contactsRouter = require('express').Router();
const Contact = require('../models/contact');

contactsRouter.get('/', (req, res) => {
  Contact.find({})
    .then(data => res.json(data));
});

contactsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  Contact.findById(id)
    .then(data => { 
      if (data) {
        res.json(data);
      } else {
        res.sendStatus(404);
      }
    });
});

contactsRouter.post('/', (req, res) => {
  const body = req.body;
  const { name, number } = body;

  if (!name || !number) {
    res.status(400).send('error: missing content');
  }
  const newContact = new Person({
    name,
    number
  });
  newContact.save()
    .then(data => {
      res.status(201).json(data)
    }); // res.sendStatus method sends status code, then automatically ends response (like how res.send sends the response and then ends it); res.status method only sends the status code 
});

contactsRouter.delete('/:id', (req, res) => { 
  const id = req.params.id; // this id does not need to be parsed into a number. it's mongo id object and mongo can interpret it as is
  Contact.deleteOne({ _id: id }) 
    .then(() => {
      res.sendStatus(204);
    });
});

contactsRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const { update } = req.body;
  Contact.findByIdAndUpdate(id, update, { new: true }) // { new: true } option needs to be there for findByIdAndUpdate to return updated version of document
    .then(data => res.json(data));
});

module.exports = contactsRouter;