let mongoose = require('mongoose')

let breakfastSubSchema = new mongoose.Schema({
    openid: { type: String, required: true },
    time: { type: String, required: true },
    food: { type: String, required: true },
    category: { type: String, default: 'breakfast' }
})

let BreakfastSub = mongoose.model('breakfast_sub', breakfastSubSchema)

module.exports = BreakfastSub