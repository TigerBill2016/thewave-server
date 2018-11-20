let express = require('express');
let router = express.Router();

let TransferModel = require('../models/transfer')

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
        res.success('预约成功')
    } catch (error) {
        res.error(error)
    }
})

router.get('/cancel', async (req, res) => {
    let { guestid } = req.query
    try {
        await TransferModel.deleteMany({ guestid: guestid })
        res.success('取消成功')
    } catch (error) {
        res.error(error)
    }
})

module.exports = router