let mongoose = require('mongoose')

let transferSchema = new mongoose.Schema({
    openid: { type: String, required: true },
    destination: { type: String, required: true },
    time: { type: String, required: true },
    flightNum: { type: String, required: true },
    remark: { type: String, },
    category: { type: String, default: 'transfer' }
})

let Transfer = mongoose.model('transfer', transferSchema)

module.exports = Transfer