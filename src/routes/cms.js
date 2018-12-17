let express = require('express');
let router = express.Router();

let BreakfastSubModel = require('../models/breakfast_sub')
let TransferModel = require('../models/transfer')
let BusrunsSubModel = require('../models/busrun_sub')
let MessageModel = require('../models/message')

router.get('/breakfast', async (req, res) => {
    try {
        let docs = await BreakfastSubModel.find().populate('guestid').sort({ 'date': 'desc' }).exec()
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
        let docs = await TransferModel.find().populate('guestid').sort({ 'date': 'desc' }).exec()
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
        let docs = await BusrunsSubModel.find().populate('guestid').sort({ 'date': 'desc' }).exec()
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

router.get('/message', async (req, res) => {
    let { type, id } = req.query

    try {
        if (type == 'handleSingle') {
            await MessageModel.findByIdAndUpdate(id, { isRemind: true }).exec()
            res.success({
                msg: '处理成功'
            })
            return
        }
        if (type == 'handleAll') {
            await MessageModel.updateMany({ isRemind: false, freshData: false }, { isRemind: true }).exec()
            res.success({
                msg: '批量处理成功'
            })
            return
        }
        if (type == 'count') {
            let count = await MessageModel.countDocuments({ isRemind: false }).exec()
            res.success({ count })
            return
        }
        let docs = await MessageModel.find().populate('guestid').sort({ 'date': 'desc' }).exec()
        let len = docs.length
        let data = []
        for (let i = 0; i < len; i++) {
            let doc = docs[i]
            data.push({
                _id: doc._id,
                guestid: doc.guestid._id,
                username: doc.guestid.username,
                number: doc.guestid.number,
                person: doc.guestid.person,
                avatar: doc.guestid.avatarUrl,
                title: doc.title,
                message: doc.message,
                isRemind: doc.isRemind,
                date: doc.date
            })
            await MessageModel.findByIdAndUpdate(doc._id, { freshData: false }).exec()
        }
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})


module.exports = router