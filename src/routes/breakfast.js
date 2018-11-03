let express = require('express');
let router = express.Router();

let BreakfastModel = require('../models/breakfast')
let BreakfastSubModel = require('../models/breakfast_sub')

router.get('/data', async (req, res) => {
    try {
        let data = await BreakfastModel.find()
        res.success(data)
    } catch (error) {
        res.error(error)
    }
})

router.get('/issubsribe', async (req, res) => {
    console.log(req.query, req.params)
    let {openid} = req.query
    try {
        let doc = await BreakfastSubModel.findOne({openid})
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
    let {body} = req
    try {
        console.log('body.time', body.time)
        let doc = await BreakfastModel.findOne({code: body.time})
        console.log('count===',doc, doc.count)
        if(doc.count <= 0) {
            throw new Error('预约次数不够');
        }
        await BreakfastSubModel.create(body)
        await BreakfastModel.update({ code: body.time }, { count: doc.count -1})
        res.success('预约早餐成功')
    } catch (error) {
        res.error(error)
    }
})

router.post('/cancel', async (req, res) => {
    let { body } = req
    try {
        await BreakfastSubModel.deleteOne(body)
        let doc = await BreakfastModel.findOne({ code: body.time })
        await BreakfastModel.update({ code: body.time }, { count: doc.count + 1 })
        res.success('取消成功')
    } catch (error) {
        res.error(error)
    }
})

router.post('/test', async (req, res) => {
    try {
        a<11
        res.success('1212')
    } catch (error) {
        res.error(error)
    }
})

module.exports = router