const mongoose = require('mongoose');

const USER = 'rankinaaron'
const PASSWORD = '7a005NPrlxgrIfKR'
const DB = 'cat-api'
const URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.enjqc.mongodb.net/${DB}?retryWrites=true&w=majority`

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const CatSchema = new mongoose.Schema({
    breeds: Array,
    id: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    vote: Boolean,
    width: Number,
    height: Number
})

module.exports = mongoose.model('Cat', CatSchema);