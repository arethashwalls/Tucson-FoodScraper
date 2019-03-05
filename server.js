//Imports
const cheerio = require('cheerio'),
      express = require('express'),
      expHandlebars = require('express-handlebars'),
      mongoose = require('mongoose'),
      axios = require('axios'),
      morgan = require('morgan');

var app = express();
var PORT = process.env.PORT || 3000;

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");