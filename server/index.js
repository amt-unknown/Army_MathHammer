// Modules and Globals
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path')

// Express Settings
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Controllers & Routes

app.use(express.urlencoded({ extended: true }));


// Add controllers
app.use('/unitdata', require('./controllers/unitdata'));
app.use('/weapondata', require('./controllers/weapondata'))
app.use('/user', require('./controllers/users'))
app.use('/authentication', require('./controllers/authentication'))

// Serve static front end in production mode
// if(process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, 'public', 'build')))
// }

// Listen for Connections
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});