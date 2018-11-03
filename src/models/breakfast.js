let mongoose = require('mongoose')

let breakfastSchema = new mongoose.Schema({
    code: { type: String, required: true },
    time: { type: String, required: true },
    count: { type: Number, required: true },
})

let Breakfast = mongoose.model('breakfast', breakfastSchema)

module.exports = Breakfast