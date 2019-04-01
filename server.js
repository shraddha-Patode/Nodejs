process.on('uncaughtException', function (err) {
    debugger;
    console.log(`Node NOT Exiting... ERROR: ${err}`);
    file.writeErrTo({
        data: `ERROR #20170912.172500 ${err}`
    });
});

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    sql = require('mssql'),
    validator = require('validator'),
    schedule = require('node-schedule'),
    http = require("http"),
    
    route = require('./scripts/route'),
    fs = require('fs'),
    port = process.env.PORT || 3025,
    global = require('./scripts/Global'),
    file = require('./scripts/File');

file.ClearOldLog();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public', {
    maxAge: 0
}))
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({
    extended: true
})) //Don't show data response in address bar

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

sql.connect(global.sqlConfig, err => {
    // ... error checks 
    if (err) {
        fs.appendFile('errorLog.txt', err + ' \n', (err) => {
            if (err) throw err;
            file.writeErrTo({
                data: `ERROR #20171025.125600 ${err}`
            });
        });
        return;
    }
});


route.route(sql, app, validator, file);
// route2.route(sql, app, validator, file);

app.listen(port, function () {
    console.log(`Map WebApp started port: ${port} @IST: ${global.GetIst()} \n ${global.GetMemUsage()}`);
});

