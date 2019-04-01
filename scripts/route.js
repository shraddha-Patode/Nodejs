//Module Pattern : Allows you to store Js at different file
console.log("route.js_Found");
var path = require('path'),
    logColor = require('colors');
var global = require('./Global');

module.exports.route = function (sql, app, validator, file) {

    app.get('/mapView', function (req, res) {
        if (global.debugMode) debugger;
        console.log("Mapview.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/MapView/Mapview.html`);
    });
    
//Scada Config
app.post('/getAutoComplete', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/getAutoComplete".grey);
     var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20180510.150300 ${err}`
            });
            console.log(`ERROR #20180510.150300 ${err}`.red)
            return;
        }
        dbConn.request()
            .execute('[sp_getMap]', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20180920.150300 ${err}`
                    });
                    console.log(`ERROR #20180920.150300 ${err}`.red)
                    res.json({
                        "0": {
                            Status: "ERROR"
                        }
                    });
                    return false;
                }
                res.json(result.recordsets)
            });
    });

});

//  get Marker
    
app.post('/getMarker', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/getMarker".grey);
     var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20180510.150300 ${err}`
            });
            console.log(`ERROR #20180510.150300 ${err}`.red)
            return;
        }
        dbConn.request()
            .input('locId',obj.locId)
            .execute('[sp_getMarker]', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20180920.150300 ${err}`
                    });
                    console.log(`ERROR #20180920.150300 ${err}`.red)
                    res.json({
                        "0": {
                            Status: "ERROR"
                        }
                    });
                    return false;
                }
                res.json(result.recordsets)
            });
    });

});
   
}
