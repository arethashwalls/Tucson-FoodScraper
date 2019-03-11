/********************************************************************************************
*                              Controller for Tucson FoodScraper                            *
********************************************************************************************/

//Imports:
const cheerio = require('cheerio'),
      axios = require('axios'),
      db = require("../models");

//Export all controller functions as an object:
module.exports = {
    //Scrape fetches and saves all scraped article data:
    scrape: (req, res) => {
        //First, make a GET request to tucsonfood.com, using the RSS feed to simply scraping:
        axios.get('https://tucsonfoodie.com/feed/')
        .then(response => {
            //Pass the response to Cheerio:
            let $ = cheerio.load(response.data, { xmlMode: true });
            //For each <item> element:
            $('item').each((i, element) => {
                //Grab and re-format the <description> element, removing some unwanted text:
                summaryData = $(element).children('description').text();
                cleanSummary = $(summaryData).first('p').text();
                cleanSummary = cleanSummary.replace(/ \[…\]/, '…');
                articleData = {
                    //All other fields are taken directly from <item>'s children:
                    url: $(element).children('link').text(),
                    headline: $(element).children('title').text(),
                    summary: cleanSummary,
                    published: $(element).children('pubDate').text(),
                    author: $(element).children('creator').text()
                };
                //Create the new article in the database:
                db.Article.create(articleData)
                .then(newArticle => console.log(`NEW ARTICLE CREATED: ${newArticle.headline}\n`))
                .catch(err => console.log(`ERROR: ${err.errmsg}\n`));
            });
            //Return to the home page:
            res.redirect('/');
        })
        //Log errors:
        .catch(err => console.log(err));
    },
    
    //Get articles (used at the home route) pulls all Articles from their collection and passes them to the 'index' view:
    getArticles: (req, res) => {
        db.Article.find({})
        //Sort articles by date, most recent at top:
        .sort({published: -1})
        //Populate notes by their IDs:
        .populate('notes')
        .then(data => {
            res.render('index', {articles: data});
        })
        .catch(err => console.log(err));
    },

    //Post note create a new note from the request body:
    postNote: (req, res) => {
        db.Note.create(req.body)
        .then(newNote => {
            return db.Article.findOneAndUpdate(
                { _id: req.params.id }, 
                { $push: {notes: newNote._id} }, 
                { new: true }
            );
        })
        //Redirect to home when finished:
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
    },

    //Delte note deletes a note from the Notes collection:
    deleteNote: (req, res) => {
        db.Note.deleteOne({_id: req.params.id})
        .then(response => res.json(response))
        .catch(err => console.log(err));
    }
}