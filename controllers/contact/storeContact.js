const Contact = require('../../models/Contact.js');
const path = require('path');

module.exports = async (req, res) => {
    console.log(req.body)
  await Contact.create({
    ...req.body,
  });
    res.redirect('/');
};
