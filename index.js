require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const engine = require('ejs-mate');

const userRoute = require('./app/routes/User.route.js');
const formRoute = require('./app/routes/Form.route.js');

const app = express();
const port = process.env.PORT || 3000;

// Template engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Middleware
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'))); // Path to assets images
app.use(express.static(path.join(__dirname, 'src'))); // Path to scripts

// Routing
app.use(userRoute);
app.use(formRoute);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});