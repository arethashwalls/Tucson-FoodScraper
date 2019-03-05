//Imports:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//RegEx pattern for matching web URLs, from [https://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text]
// const urlRegex = new RegExp("(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?")

//Set up schema:
const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        match: /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

//Create model:
const Article = mongoose.model("Article", ArticleSchema);

//Export model:
module.exports = Article;