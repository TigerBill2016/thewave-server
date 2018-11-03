let mongoose = require('mongoose')

let busrunsSubSchema = new mongoose.Schema({
    openid: { type: String, required: true },
    destination: { type: String, required: true },
    time: { type: String, required: true },
    member: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: 'bus' }
})

let BusrunsSub = mongoose.model('busruns_sub', busrunsSubSchema)

module.exports = BusrunsSub