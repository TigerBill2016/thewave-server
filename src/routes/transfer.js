let express = require('express');
let router = express.Router();

let TransferModel = require('../models/transfer')
let MessageModel = require('../models/message')

router.get('/isSubscribe', async (req, res) => {
    let { guestid } = req.query
    try {
        let doc = await TransferModel.findOne({ guestid, date: { $gte: new Date(Date.now() - 24 * 3600 * 100) } })
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
        await TransferModel.create(body)
        await MessageModel.create({
            title: body.destination == 'villas' ? '预约入住' : '预约退房',
            message: `${body.roomNum} ${body.destination == 'villas' ? 'C/I' : 'C/O'} ${body.time} ${body.flightNum} ${body.destination == 'villas' ? 'airport to villa' : 'villa to airport'} ${body.person ? body.person + '(接机牌的名字)' : ''} ${body.pax}pax ${body.remark}`,
            ...body
        })
        res.success('预约成功')
    } catch (error) {
        res.error(error)
    }
})

router.get('/cancel', async (req, res) => {
    let { guestid } = req.query
    try {
        await TransferModel.deleteMany({ guestid: guestid })
        await MessageModel.create({
            title: "取消接送机",
            guestid
        })
        res.success('取消成功')
    } catch (error) {
        res.error(error)
    }
})

module.exports = router