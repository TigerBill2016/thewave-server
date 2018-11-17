let mongoose = require('mongoose')
let Schema = mongoose.Schema

let busrunsSubSchema = new mongoose.Schema({
    guestid: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    destination: { type: String, required: true },
    time: { type: String, required: true },
    member: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: 'bus' },
    date: { type: Date, default: Date.now }
})

let BusrunsSub = mongoose.model('busruns_sub', busrunsSubSchema)

module.exports = BusrunsSub