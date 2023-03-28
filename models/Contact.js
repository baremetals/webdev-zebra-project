const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  message: String,

  datePosted: {
    type: Date,
    default: new Date(),
  },
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
