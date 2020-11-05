const mongoose = require('mongoose');

const USER = 'rankinaaron'
const PASSWORD = '7a005NPrlxgrIfKR'
const DB = 'cat-api'
const URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.enjqc.mongodb.net/${DB}?retryWrites=true&w=majority`

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const VoteSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    image_id: {
        type: String,
        required: true,
        unique: true
    },
    sub_id: String,
    create_at: String,
    id: String,
    country_code: String
})

module.exports = mongoose.model('Vote', VoteSchema);