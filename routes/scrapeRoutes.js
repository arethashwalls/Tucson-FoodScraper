//Imports and setup:
const express = require('express'),
      scrapeController = require('../controllers/scrapeController');
const router = express.Router();

//Scrape articles:
router.get('/scrape', scrapeController.scrape);

//Get articles:
router.get('/', scrapeController.getArticles);

//Post new note:
router.post('/articles/:id/newnote', scrapeController.postNote);

module.exports = router;