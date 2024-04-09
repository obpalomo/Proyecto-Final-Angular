const mongoose = require("mongoose")

const filmSchema = new mongoose.Schema({
    title: { type: String, required: true},
    year: {type: Number, required: true},
    synopsis: {type: String, required: false},
    category: {type: String, required: false},
    director: {type: String, required: false},
    image: {type: String, require:false}
})

module.exports = mongoose.model("films", filmSchema)