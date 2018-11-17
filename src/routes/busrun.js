let express = require('express');
let router = express.Router();

let BusrunsModel = require('../models/busrun')
let BusrunsSubModel = require('../models/busrun_sub')

router.get('/data', async (req, res) => {
    try {
        let data = await BusrunsModel.find()
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})

router.get('/isSubscribe', async (req, res) => {
    let { guestid } = req.query
    try {
        let doc = await BusrunsModel.findOne({ guestid })
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
        await BusrunsSubModel.create(body)
        res.success('预约成功')
    } catch (error) {
        res.error(error)
    }
})

router.get('/cancel', async (req, res) => {
    let { guestid } = req.query
    try {
        await BusrunsSubModel.deleteMany({ guestid: guestid })
        res.success('取消成功')
    } catch (error) {
        res.error(error)
    }
})

module.exports = router