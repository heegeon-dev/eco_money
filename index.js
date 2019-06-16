const express = require('express');
const app = express()
var jwt = require('jsonwebtoken');
var request = require('request');
var mysql = require('mysql');
var cors = require('cors');
var auth = require('./lib/auth');


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : '',
  password : '',
  database : ''
});
