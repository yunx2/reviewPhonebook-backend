const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
personSchema.set('toJSON', {    
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__V;
  }
});

// mongoose models are used to construct documents
const Person = mongoose.model('person', personSchema);
module.exports = Person;