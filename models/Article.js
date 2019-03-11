//Imports:
const mongoose = require("mongoose"),
      moment = require('moment');
const Schema = mongoose.Schema;


//Set up schema:
const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        //RegEx pattern for matching web URLs, from [https://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text]
        match: /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    published: {
        type: Date,
        default: Date.now(),
        get: pubDate => moment.utc(pubDate).format('MMMM D, YYYY')
     },
    author: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

//Create model:
const Article = mongoose.model("Article", ArticleSchema);

//Export model:
module.exports = Article;