let mongoose = require('mongoose')

let usersSchema = new mongoose.Schema({
    openid: {type: String, required: true},
    nickName: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    avatarUrl: { type: String, required: true },
})

let Users = mongoose.model('Users', usersSchema)

module.exports = Users