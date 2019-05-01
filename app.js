//require node modules
const express = require('express');
const app = express();

//require personal modules
const controller = require('./assets/scripts/controllers/mainController.js');

//view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./assets'));

//listening to port
app.listen(3500);

console.clear();
console.log('connected to port 3500');
//fire controller
controller(app);