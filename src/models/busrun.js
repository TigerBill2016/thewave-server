let mongoose = require('mongoose')

let busrunSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    time: { type: String, required: true },
    member: { type: Number, required: true },
})

let Busruns = mongoose.model('busruns', busrunSchema)

module.exports = Busruns