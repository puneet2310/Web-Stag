const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://WebStag:Avishkaar@cluster0.5rbxk8m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/newDB');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/products', (req, res) => {
  res.render('products');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/account', (req, res) => {
  res.render('account', { loginError: '' }); // Initialize loginError to an empty string
});



app.post('/register', async (req, res) => {
  try {
    // Validate user data (e.g., email format, password strength)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    await newUser.save();
      res.redirect('/');
    //   alert("Sucessfully Registered");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user'); // Informative error message
  }
});



app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    // Validate login credentials (replace with your actual logic)
    if (username === 'valid_username' && password === 'valid_password') {
      // Login successful
      res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Login successful!');
        res.render('new_index');
    } else {
      // Invalid credentials
      res.redirect('/account');
        alert("Invalid Credentials"); // Send JSON response with error message
    }
  });

















app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});












0// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const path = require('path');

// const app = express();
// const port = 3000;

// app.set('view engine', 'ejs');

// mongoose.connect('mongodb://localhost:27017/newDB');
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const userSchema = new mongoose.Schema({
//   username: String, // Changed to lowercase 'username'
//   password: String,
//   email: String,
// });

// // Hash password before saving the user
// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) { // Check if password is modified
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//   }
//   next();
// });

// const User = mongoose.model('User', userSchema);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'views')));

// app.get('/', (req, res) => {
//   // res.sendFile(__dirname + '/views/index.html');
// 	res.render('index');
// });

// app.get('/account', (req, res) => { // Corrected route
//   res.render('account');
// });

// app.get('/about', (req, res) => {
//   res.render('about'); // Render the about.html template
// });

// app.get('/products', (req, res) => { // Corrected route
//   res.render('products');
// });


// app.post('/register', async (req, res) => { // Use async function for async operations
//   try {
//     const newUser = new User({
//       username: req.body.username, // Changed to lowercase 'username'
//       email: req.body.email,
//       password: req.body.password,
//     });

//     await newUser.save(); // Await the save operation

//     res.redirect("/"); // Redirect to account page on success
//   } catch (err) {
//     console.log(err);
//     // Implement error handling and display message to user
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });




