let mongoose = require('mongoose')
let Schema = mongoose.Schema
let usersSchema = new Schema({
    openid: { type: String, required: true },
    nickName: { type: String, },
    gender: { type: String, },
    city: { type: String, },
    province: { type: String, },
    country: { type: String, },
    username: { type: String, required: true },
    number: { type: String, required: true },
    person: { type: Number, required: true },
    avatarUrl: { type: String, },
    startDate: { type: String, },
    endDate: { type: String, },
    date: { type: Date, default: Date.now }
})

let Users = mongoose.model('Users', usersSchema)

module.exports = Users