# [Tucson FoodScraper](https://thawing-bayou-57256.herokuapp.com/)
## A web-scraping application that parses, saves, and displays articles from Tucson Foodie along with associated comments.

Tucson FoodScraper is a full-stack web-scraping application that parses Tucson Foodie Magazine's RSS feed, saves the results in a Mongo database, and displays them. Users can comment on articles and delete their comments.

*Project Title* uses:

* The [Node.js](https://nodejs.org/en/) runtime environment.
* The [Express](https://expressjs.com/) framework.
* The [Handlebars](http://handlebarsjs.com/) templating engine.
* [Cheerio](https://github.com/cheeriojs/cheerio#readme) for server-side DOM parsing.
* [Morgan](https://github.com/expressjs/morgan#readme) for request-logging.
* A [Mongo](https://www.mongodb.com/) database.
* The [Mongoose](https://mongoosejs.com/) ORM.

### Contents:
  
* `controllers`
  * [`scrapeController.js`](/controllers/scrapeController.js) contains all controller functions.
* `models` contains models [Article](/models/Article.js) and [Note](/models/Note.js), as well as an `index.js` file.
* `public` contains all public, front-end code.
  * `images`
  * `style`
  * [`app.js`](/public/app.js) contains front-end JavaScript.
* `routes` contains the [`scrapeRoutes.js`](/routes/scrapeRoutes.js) router.
* `views` contains all Handlebars templates.
* A `gitignore` file
* NPM's `package-lock.json` and `package.json` files.
* This `readme`.
* A [`server.js`](/server.js) file for setting up the Express server.

### Models:

Project Title's database structure is:

**Article**
* *headline*: a string article title.
* *url*: a link to the original article.
* *summary*: a string article description.
* *published*: the original published date.
* *author*: a string author name.
* *notes* an array of note ObjectIds.

**Note**
* *title*: a string note title.
* *body*: a string note description.

### Views:

Project Title has only one view, which displays all articles and their associated notes.

### Controllers:

Project Title has the following routes:
* GET `/scrape` scrapes all new articles from [https://tucsonfoodie.com/feed/] (ignoring duplicates), saves them, then redirects to the `/` route.
* GET `/` fetches all saved articles from the database, populates their notes, and renders them with the `index` template.
* POST `/articles/:id/newnote` creates a new Note associated with the article with the given ID.
* DELETE `/notes/:id` deletes the Note with the given ID.
