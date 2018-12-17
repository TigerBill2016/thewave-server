let fetch = require('node-fetch');
const WebSocket = require('ws');
const http = require('http');
''
const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx2544952b01c338db&secret=34db6ebd9dbb9ed6e7a66d26cfd132ec'
const body = {
    touser: 'oJ3H64gELRBhCd3OOo0FBZfLf67c',
    "weapp_template_msg": {
        "template_id": "ABmPl3c5SW_5rw9MMzOXd2w1PFMbW2UlmpzPW1h2aWQ",
        "page": "page/page/index",
        "form_id": "1544863188977",
        "data": {
            "keyword1": {
                "value": "339208499"
            },
            "keyword2": {
                "value": "2015年01月05日 12:30"
            },
            "keyword3": {
                "value": "腾讯微信总部"
            },
            "keyword4": {
                "value": "广州市海珠区新港中路397号"
            }
        },
        "emphasis_keyword": "keyword1.DATA"
    },
};

const access_token = '16_OC-LHgXNRckpbIgHO7X4WU6TkbPggDPr1mrKpB--9JtU1THy8ZemzzS0wVTIY2M_VIMn-IiWI1VkmMXcZBQHKZiJR5NQ44ghbERx2sKsNg9uu8tBBcrsuW4iKvoHEEeAGASPP'

fetch(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=${access_token}`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
})
    .then(res => res.json())
    .then(json => console.log(json));




const server = new http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send('received');
    });

    ws.send('something');
});

server.listen(8080);
