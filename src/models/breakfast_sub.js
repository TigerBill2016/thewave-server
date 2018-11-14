let mongoose = require('mongoose')
let Schema = mongoose.Schema

let breakfastSubSchema = new Schema({
    guestid: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    time: { type: String, required: true },
    code: { type: String, required: true },
    food: { type: String, required: true },
    category: { type: String, default: 'breakfast' },
    data: { type: Date, default: Date.now }
})

let BreakfastSub = mongoose.model('breakfast_sub', breakfastSubSchema)

module.exports = BreakfastSub