let express = require('express');
let router = express.Router();

let BusrunsModel = require('../models/busrun')
let BusrunsSubModel = require('../models/busrun_sub')
let MessageModel = require('../models/message')

router.get('/data', async (req, res) => {
    try {
        let data = await BusrunsModel.find()
        data = data.map(item => ({
            ...item._doc,
            localHours: new Date().getHours() + 7,
        })).sort(function (t, e) {
            return t.time <= e.time ? -1 : 1;
        })
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})

router.get('/isSubscribe', async (req, res) => {
    let { guestid } = req.query
    try {
        let doc = await BusrunsSubModel.findOne({ guestid, date: { $gte: new Date(Date.now() - 24 * 3600 * 100) } })
        if (doc) {
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
        let params = {
            destination: body.destination,
            time: body.time
        }
        let doc = await BusrunsModel.findOne(params)
        if (doc.member - body.pax < 0) {
            res.success({
                code: 1, // 失败
                msg: `只剩余${doc.member}个座位，请选择其他时间`
            })
            return
        }
        await BusrunsSubModel.create(body)
        await BusrunsModel.update(params, { member: doc.member - body.pax })
        await MessageModel.create({
            title: '预约班车',
            message: `${body.roomNum} ${body.time} ${body.flightNum} ${body.destination == 'villas' ? 'central to villa' : 'villa to central'} ${body.pax}pax`,
            ...body
        })
        res.success({
            code: 0,
            msg: '预约成功'
        })
    } catch (error) {
        res.error(error)
    }
})

router.get('/cancel', async (req, res) => {
    let { guestid } = req.query
    try {
        let doc = await BusrunsSubModel.findOne({ guestid })
        let doc1 = await BusrunsModel.findOne({ destination: doc.destination, time: doc.time })
        await BusrunsModel.update({ destination: doc.destination, time: doc.time }, { count: doc1.member + doc.member })
        await BusrunsSubModel.deleteMany({ guestid })
        await MessageModel.create({
            title: '取消班车',
            guestid
        })
        res.success('取消成功')
    } catch (error) {
        res.error(error)
    }
})

module.exports = router