let express = require('express');
let router = express.Router();

let BreakfastSubModel = require('../models/breakfast_sub')
let TransferModel = require('../models/transfer')
let BusrunSubModel = require('../models/busrun_sub')
let UserModal = require('../models/users')

router.get('/data', async (req, res) => {
    let { guestid } = req.query
    try {
        let breakfast = await BreakfastSubModel.findOne({ guestid, date: { $gte: new Date(Date.now() - 24 * 3600 * 100) } })
        let transfer = await TransferModel.findOne({ guestid, date: { $gte: new Date(Date.now() - 24 * 3600 * 100) } })
        let bus = await BusrunSubModel.findOne({ guestid, date: { $gte: new Date(Date.now() - 24 * 3600 * 100) } })

        let data = {
            breakfast,
            transfer,
            bus,
        }
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})

router.post('/updateGuestinfo', async (req, res) => {
    let { username,
        number,
        person,
        startDate,
        endDate, guestid } = req.body
    try {
        await UserModal.updateMany({ _id: guestid }, { username, number, person, startDate, endDate })
        res.success('更新成功')
    } catch (error) {
        res.error(error)
    }
})

module.exports = router