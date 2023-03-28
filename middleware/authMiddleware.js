const User = require('../models/User');

module.exports = (req, res, next) => {
  User.findById(req.session.userId, (err, user) => {
      if (err || !user) {
        console.log(user);
        return res.redirect('/');
      } else next();
    })
    
};
