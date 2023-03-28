const User = require('../../models/User')
const path = require('path');

module.exports = (req, res) => {
    // console.log(req.body)
    User.create(req.body, (error, user) => {
        if (error) {
            // console.log(error)
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            // req.session.validationErrors = validationErrors
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body)
            // console.log(validationErrors);
            return res.redirect('/auth/register');
        }
        console.log('this is the error :', error);
        res.redirect('/')
    })
}