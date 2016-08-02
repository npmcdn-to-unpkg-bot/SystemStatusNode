// index.js

// modules =================================================
var express = require('express');
var app = express();

// configuration ===========================================

// set the port
var port = 8080; 

// static html file location
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               
                
console.log('Listening on port ' + port);