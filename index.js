const express = require('express');
const mongoose = require('mongoose');
const app = new express();
const ejs = require('ejs');
const path = require('path');

const expressSession = require('express-session');

const fileUpload = require('express-fileupload');
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const contactController = require('./controllers/contact/contact');
const storeContactController = require('./controllers/contact/storeContact');
const newPostController = require('./controllers/posts/newPost')
const storePostController = require('./controllers/posts/storePost');
const getPostController = require('./controllers/posts/getPost');
const newUserController = require('./controllers/users/newUser');
const storeUserController = require('./controllers/users/storeUser');
const loginUserController = require('./controllers/users/loginUser');
const loginController = require('./controllers/users/login');
const logoutController = require('./controllers/users/logout');

const validateMiddleware = require('./middleware/validateMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const flash = require('connect-flash');

app.use(fileUpload());
mongoose.connect(
  'mongodb+srv://daniel-asante:oyrZI3eXIJz8VFib@cluster0.vhkatsn.mongodb.net/projectZero?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true }
);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/posts/store', validateMiddleware);
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

global.loggedIn = null;

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.use(flash());
//Crud api
app.get('/', homeController);

// Auth Users
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post(
  '/users/register',
  redirectIfAuthenticatedMiddleware, storeUserController
);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);


// New posts
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/post/:id', getPostController);

app.get('/about', aboutController);
app.get('/contact', contactController);
app.post('/contact/store', storeContactController);

app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));

app.listen(3000, () => {
  console.log('listening on port 3000');
});
