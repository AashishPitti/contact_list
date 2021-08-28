// Library
const mongoose = require("mongoose");

// Make schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

//make collection
const Contact = mongoose.model("Contact", contactSchema);

// Export collection
module.exports = Contact;
