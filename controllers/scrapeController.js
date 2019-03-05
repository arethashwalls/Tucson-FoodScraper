const cheerio = require('cheerio'),
      axios = require('axios');

axios.get('https://tucsonfoodie.com/feed/')
.then(response => {
    console.log(response);
    module.exports = (req, res) => {
        res.json(response);
    }
});