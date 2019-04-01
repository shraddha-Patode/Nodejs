//Module Pattern : Allows you to store Js at different file

console.log("route.js_Found");
var path = require('path')
    , global = require('./Global')
    , logColor = require('colors');

module.exports.route = function (sql, app, validator, file) {

    // app.post('/tmpGetDate', function (req, res) {
    //     /* GET BILL REPORT BASED ON PARAMETERS SUPPLIED */
    //     if (global.debugMode) debugger;

    //     console.log("/tmpGetDate".grey);
    //     //debugger;
    //     var obj = req.body;

    //     const dbConn = new sql.ConnectionPool(global.sqlConfig, err => {
    //         // ... error checks 
    //         if (err) {
    //             debugger
    //             file.writeErrTo({
    //                 data: `ERROR #20180104.153200 ${err}`
    //             });
    //             console.log(`ERROR #20180104.153200 ${err}`.red)
    //             return;
    //         }
    //         //debugger
    //         dbConn.request()
    //             .input('dt', obj.dt)
    //             .execute('sp_testdate_2', (err, result) => {

    //                 dbConn.close()
    //                 if (err) {
    //                     debugger
    //                     file.writeErrTo({
    //                         data: `ERROR #20180104.153200 ${err}`
    //                     });
    //                     console.log(`ERROR #20180104.153200 ${err}`.red)
    //                     res.json({ status: "ERROR" });
    //                     return false;
    //                 }

    //                 res.json({ data: result.recordsets, status: true })

    //             });
    //     });

    // });

    app.get('/goto', global.IsLoggedIn, function (req, res) {

        function LogOut() {
            console.log("loggingOut".red);
            // req.logout();
            // res.redirect('/');
            if (!req.session.id) {
                req.logout();
                res.redirect('/');
            }
        }
        if (req.query.p1) {
            switch (req.query.p1.toLowerCase()) {

                //AMR SCREENS
                case "amr":
                    if (req.query.p2) {
                        switch (req.query.p2.toLowerCase()) {

                            case "baylasun":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/building6Floor.html`);
                                break;

                            case "alwaha":
                            case "alshourq":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/building4FloorAndVilla.html`);
                                break;

                            default:
                                LogOut();
                                break;
                        }
                    } else {
                        LogOut();
                    }
                    break;

                //UTILITIES SCREENS
                case "utilities":
                    if (req.query.p2) {
                        switch (req.query.p2.toLowerCase()) {

                            case "psdashboard":

                                if (req.query.p3) {
                                    switch (req.query.p3.toLowerCase()) {
                                        case "bosterpump":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/boosterPump.html`);
                                            break;
                                        case "getboosterstation1":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/boosterStation1.html`);
                                            break;
                                        case "getboosterstation2":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/boosterStation2.html`);
                                            break;
                                        case "getboosterstation3":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/boosterStation3.html`);
                                            break;
                                        case "getmainpumpstation":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/MainPumpStation.html`);
                                            break;

                                        default:
                                            LogOut();
                                            break;
                                    }
                                }
                                else {
                                    console.log("sending pumpStationDashboard.html".grey);
                                    res.sendFile(`${path.dirname(__dirname)}//public/html/pumpStationDashboard.html`);
                                }
                                break;

                            case "analyzersdashboard":
                                if (req.query.p3) {
                                    switch (req.query.p3.toLowerCase()) {
                                        case "getanalyzer":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/analyzer.html`);
                                            break;
                                        case "getanalyzer1":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/analyzer1.html`);
                                            break;
                                        case "getanalyzer2":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/analyzer2.html`);
                                            break;
                                        case "getanalyzer3":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/analyzer3.html`);
                                            break;
                                        case "getanalyzer4":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/analyzer4.html`);
                                            break;
                                        case "getanalyzer5":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/analyzer5.html`);
                                            break;
                                        default:
                                            LogOut();
                                            break;
                                    }
                                }
                                else {
                                    console.log("sending analyzersDashboard.html".grey);
                                    res.sendFile(`${path.dirname(__dirname)}//public/html/analyzersDashboard.html`);
                                }
                                break;

                            case "getrooverview":
                                if (req.query.p3) {
                                    switch (req.query.p3.toLowerCase()) {
                                        case "getropretreatment":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/roPretreatment.html`);
                                            break;
                                        case "getrocip":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/roCip.html`);
                                            break;
                                        case "getswro":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/swro.html`);
                                            break;
                                        case "getroproducttransfer":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/roProductTransfer.html`);
                                            break;
                                        case "getsodiumhydrochloride":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/sodiumHydrochloride.html`);
                                            break;
                                        case "getrowell":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/roWell.html`);
                                            break;
                                        default:
                                            LogOut();
                                            break;
                                    }
                                }
                                else {
                                    console.log("sending roOverview.html".grey);
                                    res.sendFile(`${path.dirname(__dirname)}//public/html/roOverview.html`);
                                }
                                break;

                            case "getblowerstationcontrol":
                                if (req.query.p3) {
                                    switch (req.query.p3.toLowerCase()) {
                                        case "getblowerstationcontrol":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/blowerStationControl.html`);
                                            break;
                                        case "gettsstationcontrol":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/tsStationControl.html`);
                                            break;
                                        case "getmmfcontrol":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/mmfControl.html`);
                                            break;
                                        case "getmmfpums":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/mmfPumps.html`);
                                            break;
                                        case "getmmfvalves":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/mmfValves.html`);
                                            break;
                                        case "getmmfvalves2":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/mmfValves2.html`);
                                            break;
                                        case "getmmfvalves3":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/mmfValves3.html`);
                                            break;
                                        case "gettkslevels":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/tksLevels.html`);
                                            break;
                                        case "gettransferpumps":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/transferPumps.html`);
                                            break;
                                        case "gettransferpumps2":
                                            res.sendFile(`${path.dirname(__dirname)}//public/html/transferPump2.html`);
                                            break;
                                        default:
                                            LogOut();
                                            break;
                                    }
                                }
                                else {
                                    console.log("sending blowerStationControl.html".grey);
                                    res.sendFile(`${path.dirname(__dirname)}//public/html/blowerStationControl.html`);
                                }
                                break;

                            case "getirrigation":
                                console.log("sending irrigation.html".grey);
                                res.sendFile(`${path.dirname(__dirname)}//public/html/irrigation.html`);
                                break;
                            default:
                                LogOut();
                                break;
                        }
                    } else {
                        LogOut();
                    }
                    break;

                //REPORTS SCREENS
                case "report":
                    if (req.query.p2) {
                        switch (req.query.p2.toLowerCase()) {
                            case "billingpage":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/report.html`);
                                break;
                            case "leakdetection":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/leakDetection.html`);
                                break;
                            case "analyzerreport":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/analyzerReport.html`);
                                break;
                            case "pumpstationreport":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/pumpStationReport.html`);
                                break;
                            case "devicestatus":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/deviceStatus.html`);
                                break;
                            case "currentreport":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/currentReport.html`);
                                break;

                            default:
                                LogOut();
                                break;
                        }
                    }
                    else {
                        LogOut();
                    }
                    break;

                //ALARM SCREENS
                case "alarm":
                    if (req.query.p2) {
                        switch (req.query.p2.toLowerCase()) {
                            case "allpriority":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/alarms.html`);
                                break;
                            case "highpriority":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/alarms.html`);
                                break;
                            case "mediumpriority":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/alarms.html`);
                                break;
                            case "lowpriority":
                                res.sendFile(`${path.dirname(__dirname)}//public/html/alarms.html`);
                                break;
                            default:
                                LogOut();
                                break;
                        }
                    }
                    else {
                        LogOut();
                    }
                    break;

                //mapview
                case "mapview":
                    if (global.debugMode) debugger;
                    console.log("sending mapViewNew.html".grey);
                    res.sendFile(`${path.dirname(__dirname)}//public/html/mapViewNew.html`);
                    break;

                default:
                    LogOut();
                    break;
            }

        } else {
            LogOut();
        }
    })

}



