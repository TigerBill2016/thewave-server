let mongoose = require('mongoose')
let Schema = mongoose.Schema

let transferSchema = new mongoose.Schema({
    guestid: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    destination: { type: String, required: true },
    time: { type: String, required: true },
    flightNum: { type: String, required: true },
    person: { type: String, },
    pax: { type: Number, },
    remark: { type: String, },
    category: { type: String, default: 'transfer' },
    date: { type: Date, default: Date.now }
})

let Transfer = mongoose.model('transfer', transferSchema)

module.exports = Transfer