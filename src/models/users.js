let mongoose = require('mongoose')
let Schema = mongoose.Schema
let usersSchema = new Schema({
    openid: { type: String, required: true },
    nickName: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    username: { type: String, required: true },
    number: { type: String, required: true },
    person: { type: Number, required: true },
    avatarUrl: { type: String, required: true },
    data: { type: Date, default: Date.now }
})

let Users = mongoose.model('Users', usersSchema)

module.exports = Users