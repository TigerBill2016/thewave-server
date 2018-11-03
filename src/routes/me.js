let express = require('express');
let router = express.Router();

let BreakfastSubModel = require('../models/breakfast_sub')
let TransferModel = require('../models/transfer')
let BusrunSubModel = require('../models/busrun_sub')

router.get('/data', async (req, res) => {
    let { query } = req
    try {
        let breakfast = await BreakfastSubModel.findOne(query)
        let transfer = await TransferModel.findOne(query)
        let bus = await BusrunSubModel.findOne(query)

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

module.exports = router