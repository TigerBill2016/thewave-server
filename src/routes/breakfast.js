let express = require('express');
let router = express.Router();

let BreakfastModel = require('../models/breakfast')
let BreakfastSubModel = require('../models/breakfast_sub')
let MessageModel = require('../models/message')

router.get('/data', async (req, res) => {
    try {
        let data = await BreakfastModel.find()
        data = data.sort(function (t, e) {
            return t.code <= e.code ? -1 : 1;
        })
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})

router.get('/issubsribe', async (req, res) => {
    let { guestid } = req.query
    try {
        let doc = await BreakfastSubModel.find({ guestid, date: { $gte: new Date(Date.now() - 24 * 3600 * 100) } })
        if (doc.length !== 0) {
            res.success(true)
        } else {
            res.success(false)
        }
    } catch (error) {
        res.error(error)
    }
})

router.post('/subscribe', async (req, res) => {
    let { body } = req
    try {
        let doc = await BreakfastModel.findOne({ code: body.timeCode })
        if (doc.count <= 0) {
            throw new Error('预约次数不够');
        }
        let data = {
            code: body.timeCode,
            time: doc.time,
            ...body,
        }
        await BreakfastSubModel.create(data)
        await BreakfastModel.update({ code: body.timeCode }, { count: doc.count - 1 })
        await MessageModel.create({
            title: '预约早餐',
            message: `${body.roomNum} ${doc.time} ${body.food} ${body.pax}pax`,
            ...body
        })
        res.success('预约早餐成功')
    } catch (error) {
        res.error(error)
    }
})

router.get('/cancel', async (req, res) => {
    let { guestid } = req.query
    try {
        let doc = await BreakfastSubModel.findOne({guestid})
        let doc1 = await BreakfastModel.findOne({ code: doc.code })
        await BreakfastModel.update({ code: doc.code }, { count: doc1.count + 1 })
        await BreakfastSubModel.deleteMany({guestid})
        await MessageModel.create({
            title: '取消早餐',
            guestid
        })
        res.success('取消成功')
    } catch (error) {
        res.error(error)
    }
})

router.post('/test', async (req, res) => {
    try {
        a < 11
        res.success('1212')
    } catch (error) {
        res.error(error)
    }
})

module.exports = router