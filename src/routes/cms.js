let express = require('express');
let router = express.Router();

let BreakfastSubModel = require('../models/breakfast_sub')

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
        }))
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})

module.exports = router