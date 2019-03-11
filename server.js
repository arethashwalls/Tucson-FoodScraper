/********************************************************************************************
*                          Server Setup for Tucson FoodScraper                              *
********************************************************************************************/

//Imports:
const express = require('express'),
      expHandlebars = require('express-handlebars'),
      mongoose = require('mongoose'),
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
    expHandlebars({
      defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/newsscraper";
//Database setup:
mongoose.connect( mongoURI,  { useNewUrlParser: true });

//Routing:
const scrapeRouter = require('./routes/scrapeRoutes');
app.use('/', scrapeRouter);

//Begin listening:
app.listen(PORT, () => console.log("App running on port " + PORT + "!"));