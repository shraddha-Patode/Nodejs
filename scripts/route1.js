//Module Pattern : Allows you to store Js at different file
console.log("route.js_Found");
var path = require('path'),
    logColor = require('colors');

var global = require('./Global');

module.exports.route = function (sql, app, validator, file) {

    app.get('/', function (req, res) {
        if (global.debugMode) debugger;
        console.log("userLogin.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/LoginPage/userLogin.html`);
    });

    app.get('/mapView', function (req, res) {
        if (global.debugMode) debugger;
        console.log("Mapview.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/MapView/Mapview.html`);
    });
    app.get('/mapViewpractice', function (req, res) {
        if (global.debugMode) debugger;
        console.log("Mapviewpractice.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/OmsDashboard/Mapviewpractice.html`);
    });

    app.get('/PumpStationControl', function (req, res) {
        if (global.debugMode) debugger;
        console.log("ULogin.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/PumpStationControl/PumpStationControl.html`);
    });

    app.get('/detailview', function (req, res) {
        if (global.debugMode) debugger;
        console.log("detailview.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/DetailView/detailView.html`);
    });

    app.get('/OMSdashboard', function (req, res) {
        if (global.debugMode) debugger;
        console.log("OMS_info.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/OmsDashboard/OMSdashboard.html`);
    });


    app.get('/detailview7', function (req, res) {
        if (global.debugMode) debugger;
        console.log("detailView7Roms.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/DetailView/detailView7Roms.html`);
    });

    app.get('/OMSscheduling', function (req, res) {
        if (global.debugMode) debugger;
        console.log("detailView7Roms.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/OMSschedule/OMS_Scheduling.html`);
    });

    app.get('/Scheduling', function (req, res) {
        if (global.debugMode) debugger;
        console.log("detailView7Roms.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/ROMSscheduling/Scheduling.html`);
    });

    app.get('/Demo', function (req, res) {
        if (global.debugMode) debugger;
        console.log("MapDemo.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/html/MapDemo.html`);
    });

    app.get('/Report', function (req, res) {
        if (global.debugMode) debugger;
        console.log("Report.html".grey);
        res.sendFile(`${path.dirname(__dirname)}//public/Report/Report.html`);
    });
    app.get('/Alarm', function (req, res) {
        if (global.debugMode) debugger;
        console.log("Alarm.html".gray);
        res.sendFile(`${path.dirname(__dirname)}//public/Alarm/Alarm.html`);
    })
    app.post('/logout', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/logout".gray);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180416.114700 ${err}`
                });
                console.log(`ERROR #20180416.114800 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('uid', obj.Uid)
                .execute('sp_UpdateLogout', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180416.120800 ${err}`
                        });
                        console.log(`ERROR #20180416.120900 ${err}`.red)
                        res.json({
                            "0": {
                                Status: "ERROR"
                            }
                        });
                        return false;
                    }
                    res.json(result.recordsets)
                    // Session.clear();
                });
        });
    });

    //Scada Config
    app.post('/scadaConfig', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/scadaConfig".grey);
        //  var obj = req.body;
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
                // .input('sp_getlatlong', obj.DevicePacketId)
                .execute('sp_MapDetails', (err, result) => {
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
	
	 app.post('/setInterrogate', function (req, res) {
        if (global.debugMode) debugger;
        console.log('/setInterrogate'.gray)
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger;
                file.writeErrTo({
                    data: `ERROR #20181127.124100 ${err}`
                })
                console.log(`ERROR #20181127.124100 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('boardId', obj.boardId)
                .input('cmd1', obj.cmd1)
                .execute('sp_InsertSetQueue', (err, result)=>{
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20181127.124100 ${err}`
                        });
                        console.log(`ERROR #20181127.124100 ${err}`.red)
                        res.json({
                            "0": {
                                Status: "ERROR"
                            }
                        });
                        return false;
                    }
                    res.json(result.recordsets)
            })
        })
    })


    // //Map Marker
    // app.post('/mapMarker', function (req, res) {
    //     if (global.debugMode) debugger;
    //     console.log("/mapMarker".grey);
    //     //  var obj = req.body;
    //     const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
    //         if (err) {
    //             debugger
    //             file.writeErrTo({
    //                 data: `ERROR #20180510.150300 ${err}`
    //             });
    //             console.log(`ERROR #20180510.150300 ${err}`.red)
    //             return;
    //         }
    //         dbConn.request()
    //             // .input('sp_getlatlong', obj.DevicePacketId)
    //             .execute('sp_getMarker', (err, result) => {
    //                 dbConn.close()
    //                 if (err) {
    //                     debugger
    //                     file.writeErrTo({
    //                         data: `ERROR #20180920.150300 ${err}`
    //                     });
    //                     console.log(`ERROR #20180920.150300 ${err}`.red)
    //                     res.json({
    //                         "0": {
    //                             Status: "ERROR"
    //                         }
    //                     });
    //                     return false;
    //                 }
    //                 res.json(result.recordsets)
    //             });
    //     });

    // });

    app.post('/abc', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/abc".grey);
        // debugger;
        var obj = req.body;
        //console.log(obj);
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            // ... error checks 
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180328.162500 ${err}`
                });
                console.log(`ERROR #20180328.162500 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('loginId', obj.loginId)
                .input('password', obj.password)

                .execute('[sp_userLogin]', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180328.162500 ${err}`
                        });
                        console.log(`ERROR #20180328.162500 ${err}`.red)
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


    app.post('/getPumpData', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getPumpData".grey);
        // debugger;
        var obj = req.body;
        //console.log(obj);
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            // ... error checks 
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180328.162500 ${err}`
                });
                console.log(`ERROR #20180328.162500 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('fieldDevice', obj.fieldDevice)
                .execute('sp_getPumpData', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180328.162500 ${err}`
                        });
                        console.log(`ERROR #20180328.162500 ${err}`.red)
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

    // To display controller Data
    app.post('/getControllerDetail', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getControllerDetail".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180816.154500 ${err}`
                });
                console.log(`ERROR #20180816.154500 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('areaId', obj.areaId)
                .execute('sp_getControllerDetails', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180816.154500 ${err}`
                        });
                        console.log(`ERROR #20180816.154500 ${err}`.red)
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

        //get ROMS mode in control panel
        app.post('/getROMSMode', function (req, res) {
            if (global.debugMode) debugger;
            console.log("/getROMSMode".grey);
            var obj = req.body;
            const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20181103.150300 ${err}`
                    });
                    console.log(`ERROR #20181103.150300 ${err}`.red)
                    return;
                }
                dbConn.request()
                    .input('omsid',obj.omsid)
                    .execute('[sp_OmsRomsDetailsByOmsId]', (err, result) => {
                        dbConn.close()
                        if (err) {
                            debugger
                            file.writeErrTo({
                                data: `ERROR #20181103.150300 ${err}`
                            });
                            console.log(`ERROR #20181103.150300 ${err}`.red)
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

    app.post('/getCtrlerStatus', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getCtrlerStatus".grey);
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
                .input('deviceId', obj.deviceId)
                .execute('[sp_contollerStatus]', (err, result) => {
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


    // To display tag Drop down Data
    app.post('/getTagList', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getTagList".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180816.154500 ${err}`
                });
                console.log(`ERROR #20180816.154500 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('areaId', obj.areaId)
                .execute('sp_getTagList', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180816.154500 ${err}`
                        });
                        console.log(`ERROR #20180816.154500 ${err}`.red)
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


    app.post('/getAreaPSCPMode', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getAreaPSCPMode".grey);
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
                .input('areaId', obj.areaId)
                .execute('sp_getPSCPMode', (err, result) => {
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

    // To show Todays data
    app.post('/getTodaysData', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getTodaysData".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180816.154500 ${err}`
                });
                console.log(`ERROR #20180816.154500 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('areaId', obj.areaId)
                .execute('sp_getTodayControllerData', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180816.154500 ${err}`
                        });
                        console.log(`ERROR #20180816.154500 ${err}`.red)
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

    // To display controller Data For A
    app.post('/ControllerA', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/ControllerA".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180816.154500 ${err}`
                });
                console.log(`ERROR #20180816.154500 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('areaId', obj.areaId)
                .execute('sp_ControllerDataForA', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180816.154500 ${err}`
                        });
                        console.log(`ERROR #20180816.154500 ${err}`.red)
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


    app.post('/InsertSetQueue', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/InsertSetQueue".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20181003.124100 ${err}`
                });
                console.log(`ERROR #20181003.124100 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('boardId', obj.boardId)
                .input('cmd1', obj.cmd1)
               
                .execute('sp_InsertSetQueue', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20181003.124100 ${err}`
                        });
                        console.log(`ERROR #20181003.124100 ${err}`.red)
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


    app.post('/InsertSetQueue1', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/InsertSetQueue1".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20181003.124100 ${err}`
                });
                console.log(`ERROR #20181003.124100 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('boardId', obj.boardId)
                .input('cmd1', obj.cmd1)
                .input('cmd2', obj.cmd2)
                .input('cmd3', obj.cmd3)
                .input('cmd4', obj.cmd4)
                .input('cmd5', obj.cmd5)
                .input('cmd6', obj.cmd6)
                .input('cmd7', obj.cmd7)
                .input('cmd8', obj.cmd8)
                .input('cmd9', obj.cmd9)
                .execute('sp_InsertSetQueue1', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20181003.124100 ${err}`
                        });
                        console.log(`ERROR #20181003.124100 ${err}`.red)
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

    // To display controller Data For B
    app.post('/ControllerB', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/ControllerB".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180816.154500 ${err}`
                });
                console.log(`ERROR #20180816.154500 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('areaId', obj.areaId)
                .execute('sp_ControllerDataForB', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180816.154500 ${err}`
                        });
                        console.log(`ERROR #20180816.154500 ${err}`.red)
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


    // To display controller Data For C
    app.post('/ControllerC', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/ControllerC".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180816.154500 ${err}`
                });
                console.log(`ERROR #20180816.154500 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('areaId', obj.areaId)
                .execute('sp_ControllerDataForC', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180816.154500 ${err}`
                        });
                        console.log(`ERROR #20180816.154500 ${err}`.red)
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

    // To display controller Data For D
    app.post('/ControllerD', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/ControllerD".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180816.154500 ${err}`
                });
                console.log(`ERROR #20180816.154500 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('areaId', obj.areaId)
                .execute('sp_ControllerDataForD', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180816.154500 ${err}`
                        });
                        console.log(`ERROR #20180816.154500 ${err}`.red)
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

    // get Volume data
    app.post('/getVolume', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getVolume".grey);
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
                .execute('[sp_getVolume]', (err, result) => {
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

    app.post('/PumpstationData', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/PumpstationData".grey);
        // debugger;
        //  var obj = req.body;
        //console.log(obj);
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            // ... error checks 
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20180328.162500 ${err}`
                });
                console.log(`ERROR #20180328.162500 ${err}`.red)
                return;
            }
            dbConn.request()
                //.input('fieldDevice',obj.fieldDevice)
                .execute('sp_PumpstationData', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20180328.162500 ${err}`
                        });
                        console.log(`ERROR #20180328.162500 ${err}`.red)
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

    app.post('/getAreadistchaklist', function (req, res) {
        if (global.debugMode) debugger;
        console.log('/getAreadistchaklist'.gray);
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger;
                file.writeErrTo({
                    data: `ERROR #20181029.171200 ${err}`
                });
                console.log(`ERROR #20181029.171200 ${err}`.red);
                return;
            }
            dbConn.request()
                .execute('sp_getAreadistchaklist', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20181029.171200 ${err}`
                        });
                        console.log(`ERROR #20181029.171200 ${err}`.red)
                        res.json({
                            "0": {
                                Status: "ERROR"
                            }
                        });
                        return false;
                    }
                    res.json(result.recordsets);
                });
        });
    });

 //get ROMS data
 app.post('/getROMSdata', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/getROMSdata".grey);
    var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20181029.150300 ${err}`
            });
            console.log(`ERROR #20181029.150300 ${err}`.red)
            return;
        }
        dbConn.request()
            .input('omsid',obj.omsid)
            .execute('[sp_RomsDetailsByOmsId]', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20181029.150300 ${err}`
                    });
                    console.log(`ERROR #20181029.150300 ${err}`.red)
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
    
      //get ROMS scheduling details
      app.post('/getROMSscheduling', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getROMSscheduling".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20181101.150300 ${err}`
                });
                console.log(`ERROR #20181101.150300 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('omsid',obj.omsid)
                .execute('[sp_OmsRomsDetailsByOmsId]', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20181101.150300 ${err}`
                        });
                        console.log(`ERROR #20181101.150300 ${err}`.red)
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

app.post('/getOmsChart', function (req, res) {
	if (global.debugMode) debugger;
	console.log("/getOmsChart".grey);
	var obj = req.body;
	const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
		if (err) {
			debugger
			file.writeErrTo({
				data: `ERROR #20181121.150300 ${err}`
			});
			console.log(`ERROR #20181121.150300 ${err}`.red)
			return;
		}
		dbConn.request()
			.input('omsid',obj.omsid)
			.input('trendId',obj.trendId)
			.input('startDate',obj.startDate)
			.input('endDate',obj.endDate)
			.input('frequency',obj.frequency)
			.execute('[sp_OmsTrendsChart]', (err, result) => {
				dbConn.close()
				if (err) {
					debugger
					file.writeErrTo({
						data: `ERROR #20181121.150300 ${err}`
					});
					console.log(`ERROR #20181121.150300 ${err}`.red)
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
	
    // get Alarm Detail
     
     app.post('/getAlarm', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getAlarm".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20181101.150300 ${err}`
                });
                console.log(`ERROR #20181101.150300 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('stDate', obj.stDate)
                .input('edDate', obj.edDate)
                .input('alarmType', obj.alarmType)
                .input('omsid',obj.omsid)
                .execute('[sp_getAlarm]', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20181101.150300 ${err}`
                        });
                        console.log(`ERROR #20181101.150300 ${err}`.red)
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
	
	 //Get Project Name

app.post('/getProjname', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getProjname".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20181101.150300 ${err}`
                });
                console.log(`ERROR #20181101.150300 ${err}`.red)
                return;
            }
            dbConn.request()
                .execute('[sp_getProjName]', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20181101.150300 ${err}`
                        });
                        console.log(`ERROR #20181101.150300 ${err}`.red)
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
	
	//Get All Alarm data
app.post('/getAllAlarm', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/getAllAlarm".grey);
    var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20181101.150300 ${err}`
            });
            console.log(`ERROR #20181101.150300 ${err}`.red)
            return;
        }
        dbConn.request()
            .input('stDate', obj.stDate)
            .input('edDate', obj.edDate)
            .input('alarmType', obj.alarmType)
            .input('history',obj.history)
            .execute('[sp_getAlarmHist]', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20181101.150300 ${err}`
                    });
                    console.log(`ERROR #20181101.150300 ${err}`.red)
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


 //Get PT data
 app.post('/getPTData', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/getPTData".grey);
    // var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20181014.150300 ${err}`
            });
            console.log(`ERROR #20181014.150300 ${err}`.red)
            return;
        }
        dbConn.request()
            // .input('fieldDevice', obj.fieldDevice)
            .execute('sp_getPTData', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20181014.150300 ${err}`
                    });
                    console.log(`ERROR #20181014.150300 ${err}`.red)
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



//Get FLOW data
app.post('/getFLOWData', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/getFLOWData".grey);
     var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20181014.150300 ${err}`
            });
            console.log(`ERROR #20181014.150300 ${err}`.red)
            return;
        }
        dbConn.request()
             .input('fieldDevice', obj.fieldDevice)
            .execute('sp_getFlowRateData', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20181014.150300 ${err}`
                    });
                    console.log(`ERROR #20181014.150300 ${err}`.red)
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


 //Get INTEK SUMP data
 app.post('/getINTEKSUMPData', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/getINTEKSUMPData".grey);
    //  var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20181014.150300 ${err}`
            });
            console.log(`ERROR #20181014.150300 ${err}`.red)
            return;
        }
        dbConn.request()
            //  .input('fieldDevice', obj.fieldDevice)
            .execute('sp_getInteksumpData', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20181014.150300 ${err}`
                    });
                    console.log(`ERROR #20181014.150300 ${err}`.red)
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

 //Get MBFV data
    app.post('/getMBFVData', function (req, res) {
        if (global.debugMode) debugger;
        console.log("/getMBFVData".grey);
        var obj = req.body;
        const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
            if (err) {
                debugger
                file.writeErrTo({
                    data: `ERROR #20181014.150300 ${err}`
                });
                console.log(`ERROR #20181014.150300 ${err}`.red)
                return;
            }
            dbConn.request()
                .input('fieldDevice', obj.fieldDevice)
                .execute('sp_getMBFVData', (err, result) => {
                    dbConn.close()
                    if (err) {
                        debugger
                        file.writeErrTo({
                            data: `ERROR #20181014.150300 ${err}`
                        });
                        console.log(`ERROR #20181014.150300 ${err}`.red)
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
	
	//Send Commnad
app.post('/SendPLCCommand', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/SendPLCCommand".grey);
    var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20181101.150300 ${err}`
            });
            console.log(`ERROR #20181101.150300 ${err}`.red)
            return;
        }
        dbConn.request()
            .input('tagname', obj.tagname)
            .input('data', obj.data)
            .execute('sp_sendPLCCommand', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20181101.150300 ${err}`
                    });
                    console.log(`ERROR #20181101.150300 ${err}`.red)
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

//BPT value
app.post('/BPT', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/BPT".grey);
    var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20181101.150300 ${err}`
            });
            console.log(`ERROR #20181101.150300 ${err}`.red)
            return;
        }
        dbConn.request()
            .execute('sp_TempBPT', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20181101.150300 ${err}`
                    });
                    console.log(`ERROR #20181101.150300 ${err}`.red)
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



//Get Interrogate
app.post('/checkInrterrogate', function (req, res) {
    if (global.debugMode) debugger;
    console.log("/checkInrterrogate".grey);
    var obj = req.body;
    const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
        if (err) {
            debugger
            file.writeErrTo({
                data: `ERROR #20181101.150300 ${err}`
            });
            console.log(`ERROR #20181101.150300 ${err}`.red)
            return;
        }
        dbConn.request()
        .input('boardId', obj.boardId)
            .execute('sp_InterrogateCommand', (err, result) => {
                dbConn.close()
                if (err) {
                    debugger
                    file.writeErrTo({
                        data: `ERROR #20181101.150300 ${err}`
                    });
                    console.log(`ERROR #20181101.150300 ${err}`.red)
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
