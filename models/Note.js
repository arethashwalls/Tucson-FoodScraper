//Imports:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Set up schema:
const NoteSchema = new Schema({
    title: String,
    body: String
});

//Create model:
const Note = mongoose.model("Note", NoteSchema);

//Export model:
module.exports = Note;