let mongoose = require('mongoose')
let Schema = mongoose.Schema

let MessageSchema = new Schema({
    guestid: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    title: { type: String, required: true },
    message: { type: String },
    isRemind: { type: Boolean, default: false, required: true },
    freshData:{ type: Boolean, default: true, required: true }, //被查询接口调用置为false
    date: { type: Date, default: Date.now }
})

let Message = mongoose.model('message', MessageSchema)

module.exports = Message