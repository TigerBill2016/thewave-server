let express = require('express');
let router = express.Router();
let fetch = require('node-fetch');
let { stringify } = require('querystring')
let WXBizDataCrypt = require('../utils/WXBizDataCrypt')
let { appid, secret } = require('../../config.app')

let UsersModel = require('../models/users')

router.get('/', (req, res) => {
    let { code } = req.query;
    let params = {
        appid,
        secret,
        js_code: code,
        grant_type: 'authorization_code',
    }
    fetch(`https://api.weixin.qq.com/sns/jscode2session?${stringify(params)}`)
        .then(res => res.json())
        .then(body => {
            res.success(body)
        })
});

router.post('/user', async (req, res) => {
    let { session_key, encryptedData, iv } = req.body
    let pc = new WXBizDataCrypt(appid, session_key)
    let data = pc.decryptData(encryptedData, iv)
    console.log('==================data.openId', data.openId)

    let doc = await UsersModel.findOne({ openid: data.openId })
    if (doc) {
        res.success('guest already exists')
        return
    }
    let user = new UsersModel({ ...data, openid: data.openId, })
    try {
        await user.save()
        res.success('ok')
    } catch (err) {
        res.error(err)
    }
})

module.exports = router