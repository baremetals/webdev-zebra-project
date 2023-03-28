const bcrypt = require('bcrypt');

const User = require('../../models/User');

module.exports = (req, res) => {
  const { username, password } = req.body;
//   console.log(req.body)
  User.findOne({ username: username }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
            console.log(error)
          if (same) {
            // console.log(user)
            req.session.userId = user._id
            res.redirect('/');
          } else {
            res.redirect('/auth/login');
          }
        });
      }
    })
    
};

