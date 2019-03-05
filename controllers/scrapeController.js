const cheerio = require('cheerio'),
      axios = require('axios');

module.exports.getArticles = function (req, res) {
    axios.get('https://tucsonfoodie.com/feed/')
    .then(response => {
        let $ = cheerio.load(response.data, {xmlMode: true});
        let articleData = [];
        $('item').each((i, element) => {
            summaryData = $(element).children('description').text();
            cleanSummary =  $(summaryData).first('p').text();
            cleanSummary = cleanSummary.replace(/ \[…\]/, '…');
            articleData.push({
                url: $(element).children('link').text(),
                headline: $(element).children('title').text(),
                summary: cleanSummary
            })
        })
        res.render('index', {articles: articleData});
    });
}