require('./src/models')
let express = require('express');
let cors = require('cors')
let schedule = require('node-schedule')
let method = require('./src/utils/method')
let dailyRun = require('./src/models/dailyTask')

let loginRouter = require('./src/routes/login');
let breakfastRouter = require('./src/routes/breakfast');
let transferRouter = require('./src/routes/transfer');
let busrunRouter = require('./src/routes/busrun');
let meRouter = require('./src/routes/me');
let cmsRouter = require('./src/routes/cms')

let app = express();
app.use(express.json());
app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }));
app.use(method())

app.get('/', (req, res) => {
    res.status(200).send('success')
});
app.use('/login', loginRouter);
app.use('/breakfast', breakfastRouter);
app.use('/transfer', transferRouter);
app.use('/busrun', busrunRouter);
app.use('/me', meRouter);
app.use('/cms', cmsRouter);
app.get('/time', (req, res) => {
    res.success(new Date())
})

// 定时任务
dailyRun()
schedule.scheduleJob('30 1 1 * * *', function () {
    dailyRun()
    console.log('scheduleCronstyle:' + new Date());
});

let server = app.listen(3002, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
