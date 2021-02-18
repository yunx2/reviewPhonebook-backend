const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  number: {
    type: String,
    required: true,
    minlength: 5
  }
});

personSchema.set('toJSON', {  // modify toJSON method of schema to remove the field __v and replace the field _id with id (this toJSON method is called when res.json(...) is used to send data)
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__V;
  }
});

// mongoose models are used to construct documents
const Person = mongoose.model('person', personSchema);
module.exports = Person;