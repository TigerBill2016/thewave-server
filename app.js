require('./src/models')
require('./src/models/dailyTask')
let express = require('express');
let method = require('./src/utils/method')

let loginRouter = require('./src/routes/login');
let breakfastRouter = require('./src/routes/breakfast');
let transferRouter = require('./src/routes/transfer');
let busrunRouter = require('./src/routes/busrun');
let meRouter = require('./src/routes/me');

let app = express();
app.use(express.json());
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

let server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
