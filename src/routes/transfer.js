let express = require('express');
let router = express.Router();

let TransferModel = require('../models/transfer')

router.post('/subscribe', async (req, res) => {
    let { body } = req
    try {
        await TransferModel.create(body)
        res.success('预约成功')
    } catch (error) {
        res.error(error)
    }
})

module.exports = router