//Imports:
const express = require('express'),
      expHandlebars = require('express-handlebars'),
      mongoose = require('mongoose'),
      axios = require('axios'),
      morgan = require('morgan');

var app = express();
var PORT = process.env.PORT || 3000;

//Middleware setup:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

//Handlebars setup:
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

//Database setup:
mongoose.connect(
    "mongodb://localhost/unit18Populater", 
    { useNewUrlParser: true }
);

//Begin listening:
app.listen(PORT, () => console.log("App running on port " + PORT + "!"));