let express = require('express');
let router = express.Router();

let BreakfastSubModel = require('../models/breakfast_sub')
let TransferModel = require('../models/transfer')
let BusrunsSubModel = require('../models/busrun_sub')


router.get('/breakfast', async (req, res) => {
    try {
        let docs = await BreakfastSubModel.find().populate('guestid').exec()
        let data = docs.map(doc => ({
            guestid: doc.guestid._id,
            username: doc.guestid.username,
            number: doc.guestid.number,
            person: doc.guestid.person,
            avatar: doc.guestid.avatarUrl,
            time: doc.time,
            food: doc.food,
            date: doc.date
        }))
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})


router.get('/transfer', async (req, res) => {
    try {
        let docs = await TransferModel.find().populate('guestid').exec()
        let data = docs.map(doc => ({
            guestid: doc.guestid._id,
            username: doc.guestid.username,
            number: doc.guestid.number,
            person: doc.guestid.person,
            avatar: doc.guestid.avatarUrl,
            destination: doc.destination,
            time: doc.time,
            flightNum: doc.flightNum,
            remark: doc.remark,
            date: doc.date
        }))
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})

router.get('/bus', async (req, res) => {
    try {
        let docs = await BusrunsSubModel.find().populate('guestid').exec()
        let data = docs.map(doc => ({
            guestid: doc.guestid._id,
            username: doc.guestid.username,
            number: doc.guestid.number,
            person: doc.guestid.person,
            avatar: doc.guestid.avatarUrl,
            destination: doc.destination,
            time: doc.time,
            member: doc.member,
            price: doc.price,
            date: doc.date
        }))
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})



module.exports = router