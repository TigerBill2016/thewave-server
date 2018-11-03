let mongoose = require('mongoose');
let { DB_URL } = require('../../config.app');

mongoose.connect(DB_URL, { useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("database we're connected!")
});