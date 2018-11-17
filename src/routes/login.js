let express = require('express');
let mongoose = require('mongoose')
let router = express.Router();
let fetch = require('node-fetch');
let { stringify } = require('querystring')
let WXBizDataCrypt = require('../utils/WXBizDataCrypt')
let { appid, secret } = require('../../config.app')

let UsersModel = require('../models/users')
let Schema = mongoose.Schema

router.get('/', (req, res) => {
    let { code } = req.query;
    let params = {
        appid,
        secret,
        js_code: code,
        grant_type: 'authorization_code',
    }
    console.log(new Date(),'code 换取 session_key openid')
    fetch(`https://api.weixin.qq.com/sns/jscode2session?${stringify(params)}`)
        .then(res => res.json())
        .then(body => {
            console.log(new Date(), 'body', body)
            res.success(body)
        })
});

router.post('/user', async (req, res) => {
    console.log(req.body)
    let { session_key, encryptedData, iv, ...rest } = req.body
    let pc = new WXBizDataCrypt(appid, session_key)
    let data = pc.decryptData(encryptedData, iv)
    console.log('session_key... 生成 openid', data.openId, data)

    // let doc = await UsersModel.findOne({ _id: data.openId })
    // if (doc) {
    //     res.success('guest already exists')
    //     return
    // }

    try {
        let hasUser = await UsersModel.findOne({ openid: data.openId })
        if (hasUser) {
            let doc = await UsersModel.updateOne({ openid: data.openId }, { ...data, ...rest, })
            console.log('doc', doc)
            res.success({
                guestid: hasUser._id,
                msg:'更新用户信息成功'
            })
        } else {
            let doc = await UsersModel.create({
                ...data, ...rest, openid: data.openId,
            })
            res.success({ guestid: doc._id,msg: '新增用户信息成功' })
        }
    } catch (err) {
        res.error(err)
    }
})

module.exports = router