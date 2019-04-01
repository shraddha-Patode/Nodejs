// /// <reference path="e:\projects\svn\sapl_scada_wangna_\samples\basicconsole\forms\currentstatus.html" />
// /// <reference path="e:\projects\svn\sapl_scada_wangna_\samples\basicconsole\forms\currentstatus.html" />

/*REPLACE EMPTY BY    REPLACE EMPTY BY    REPLACE EMPTY BY    REPLACE EMPTY BY    REPLACE EMPTY BY    REPLACE EMPTY BY*/
//data: nikh

// var serverIp = "http://" + "192.168.0.33" + ":3010/";
//var serverIp = "http://" + "148.251.43.230" + ":3001/";

var serverIp = window.origin;

// function GetCookie(status) {
//     var cookieVal = document.cookie.replace(/(?:(?:^|.*;\s*)KAEC\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//     if (replaceNull(cookieVal, "") === "") {
//         return false;
//     }
//     else {
//         return JSON.parse(decodeURIComponent(decodeURI(cookieVal)));
//     }
// }


// function checkCookieData() {
//     var cookieData = GetCookie();
//     if (cookieData == false) {
//         console.log('ERROR#20171228.120755 cookie false');
//         alert('Some Authorization Issue Please Login Again');
//         window.location = "/";
//     }
// }



function replaceNull(data, replaceBy, raiseError) {
    //var JSdata = JSON.stringify(data);
    if (replaceBy === undefined) replaceBy = false;
    if (raiseError === undefined) raiseError = false;
    if (data === undefined) {
        if (raiseError) throw ("#020416.125900 data was <undefined>");
        return replaceBy;
    } else if (data === null) {
        if (raiseError) throw ("#020416.125901 data was <null>");
        return replaceBy;

    } else if (data.length === 0) {
        if (raiseError) throw ("#020416.125902 data length was <0>");
        return replaceBy;
    }
    return data;
}
/*REPLACE EMPTY BY END    REPLACE EMPTY BY END    REPLACE EMPTY BY END    REPLACE EMPTY BY END    REPLACE EMPTY BY END    REPLACE EMPTY BY END*/

/*PRINT+PDF    PRINT+PDF    PRINT+PDF    PRINT+PDF    PRINT+PDF    PRINT+PDF    PRINT+PDF    PRINT+PDF    PRINT+PDF    PRINT+PDF*/
/*
function PrintHtml(htmlEle, prerequisite, printTitle, printDelay) {

    if (!replaceNull(htmlEle)) {
        console.warn("-NO ELEMENT TO PRINT/PDF-");
    }

    //THIS IS REQUIRED AS PAGE TAKES TIME TO RENDER IN SOME BROWSERS LIKE CHROME
    if (printDelay === undefined || printDelay === NaN) {
        printDelay = 3000;
    }

    //window.open(URL,name,specs,replace) ::MORE INFO:http://www.w3schools.com/jsref/met_win_open.asp
    var mywindow = window.open("", "_blank", "height=800,width=775,left=0,top=5,resizable=0");
    mywindow.document.write(prerequisite);

    mywindow.document.write("<html><head><title>" + replaceNull(printTitle, "") + "</title>");
    mywindow.document.write("</head><body >");

    var htmlToPrint = htmlEle;

    mywindow.document.write(htmlToPrint);

    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10


    setTimeout(function () {
      mywindow.print();
    }, printDelay);

    //mywindow.close();

    return true;
}
*/

/*DECODE URL FOR PARAMETER*/
function GetURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
/*DECODE URL FOR PARAMETER END*/

function PrintHtml(o) {

    var htmlEle = replaceNull(o["data"], ""),
        prerequisite = replaceNull(o["preData"], ""),
        printTitle = replaceNull(o["title"], ""),
        printDelay = replaceNull(o["delay"], 2000);

    if (!replaceNull(htmlEle)) {
        console.warn("-NO ELEMENT TO PRINT/PDF-");
    }

    //THIS IS REQUIRED AS PAGE TAKES TIME TO RENDER IN SOME BROWSERS LIKE CHROME
    if (printDelay === undefined || printDelay === NaN) {
        printDelay = 3000;
    }

    //window.open(URL,name,specs,replace) ::MORE INFO:http://www.w3schools.com/jsref/met_win_open.asp
    var mywindow = window.open("", "_blank", "height=800,width=785,left=0,top=5,resizable=0");
    mywindow.document.write(prerequisite);

    mywindow.document.write("<html><head><title>" + replaceNull(printTitle, "") + "</title>");
    mywindow.document.write("</head><body >");

    var htmlToPrint = htmlEle;

    mywindow.document.write(htmlToPrint);

    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10


    setTimeout(function () {
        mywindow.print();
    }, printDelay);

    //mywindow.close();

    return true;
}

/*PRINT+PDF END    PRINT+PDF END    PRINT+PDF END    PRINT+PDF END    PRINT+PDF END    PRINT+PDF END    PRINT+PDF END    */


var pgTitlePages = {

    //FOR ICON OPTIONS, REFER PAGE http://fontawesome.io/icons/ OR http://getbootstrap.com/components/

    0: {
        title: "Device Status",
        iconClass: "glyphicon glyphicon-th-large",
        defaultOpen: true,
        subTitles: {
            0: {
                onClick: 'window.location = window.location.origin + "/ritz"',
                title: "Dashboard",
                iconClass: "glyphicon glyphicon-option-vertical text-primary"
            },

            1: {
                onClick: 'window.location = window.location.origin + "/GetUserDetails"',
                title: "User Details",
                iconClass: "glyphicon glyphicon-option-vertical text-primary",
            },
            2: {
                onClick: 'window.location = window.location.origin + "/GetProjectDetails"',
                title: "Project Details",
                iconClass: "glyphicon glyphicon-option-vertical text-primary",
            },
            3: {
                onClick: 'window.location = window.location.origin + "/GetMasterDevices"',
                title: "Master Device",
                iconClass: "glyphicon glyphicon-option-vertical text-primary",
            },
            // 3: {
            //     onClick: 'window.location = window.location.origin + "/goto?areaName=Al-Shourq&p1=amr&p2=alshourq"',
            //     title: "Al-Shourq",
            //     htmlAttribute: {
            //         ["area-name"]: "'Al-Shourq'"
            //         , ["access-control"]: undefined
            //     },
            //     iconClass: "glyphicon glyphicon-option-vertical text-primary",
            //     optionIcon: "../images/al-shurooq.png"
            // }
        }
    }

    // ,
    // 1: {
    //     title: "Utilities",
    //     iconClass: "glyphicon glyphicon-user",
    //     defaultOpen: false,
    //     subTitles: {
    //         0: {
    //             onClick: 'window.location = window.location.origin + "/goto?utilityName=pump station DashBoard&p2=psDashboard&p1=utilities"',
    //             title: "Pumping Station",
    //             htmlAttribute: {
    //                 ["area-name"]: "'PUMPSTATION'"
    //                 , ["access-control"]: undefined
    //             },
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/pumpstation icon.png"
    //         },
    //         1: {
    //             onClick: 'window.location = window.location.origin + "/goto?utilityName=analyzer DashBoard&p2=analyzersDashboard&p1=utilities"',
    //             title: "Water Quality Analyzer",
    //             htmlAttribute: {
    //                 ["area-name"]: "'ANALYZER'"
    //                 , ["access-control"]: undefined
    //             },
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/Anaylzer.png"
    //         },
    //         2: {
    //             onClick: 'window.location = window.location.origin + "/goto?utilityName=ro overview&p2=getRoOverview&p1=utilities"',
    //             title: "Reverse Osmosis Plant",
    //             htmlAttribute: {
    //                 ["area-name"]: "'RO'"
    //                 , ["access-control"]: undefined
    //             },
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/RO.PNG"
    //         },
    //         3: {
    //             onClick: 'window.location = window.location.origin + "/goto?utilityName=blower station control&p2=getBlowerStationControl&p1=utilities"',
    //             title: "Sewage Treatment Plant",
    //             htmlAttribute: {
    //                 ["area-name"]: "'STP'"
    //                 , ["access-control"]: undefined
    //             },
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/STP.PNG"
    //         },
    //         4: {
    //             onClick: 'window.location = window.location.origin + "/goto?utilityName=irrigation&p2=getIrrigation&p1=utilities"',
    //             title: "Irrigation Plant",
    //             htmlAttribute: {
    //                 ["area-name"]: "'IRRIGATION'"
    //                 , ["access-control"]: undefined
    //             },
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/irrigation.png"
    //         }
    //     }
    // }

    // ,
    // 2: {
    //     title: "Reports",
    //     iconClass: "glyphicon glyphicon-cog",
    //     defaultOpen: false,
    //     subTitles: {
    //         0: {
    //             onClick: 'window.location = window.location.origin + "/goto?reportName=amr&p2=billingPage&p1=report"',
    //             title: "AMR",
    //             htmlAttribute: {
    //                 ["area-name"]: '"Bay La Sun", "Al-Shourq" ,"Al-Waha"'
    //                 , ["access-control"]: undefined
    //             },
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/Reports.png"
    //         },
    //         1: {
    //             onClick: 'window.location =  window.location.origin + "/goto?reportName=leak detection&p2=leakDetection&p1=report"',
    //             title: "Leak Detection",
    //             htmlAttribute: {
    //                 ["area-name"]: '"Leak Detection"'
    //                 , ["access-control"]: undefined
    //             },
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/leakageReport.png"
    //         },
    //         2: {
    //             onClick: 'window.location = window.location.origin + "/goto?reportName=analyzer&p2=analyzerReport&p1=report"',
    //             title: "Analyzer",
    //             htmlAttribute: {
    //                 ["area-name"]: '"ANALYZER"'
    //                 , ["access-control"]: undefined
    //             },
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/analyzerReport.png"
    //         },
    //         3: {
    //             onClick: 'window.location = window.location.origin + "/goto?reportName=pump station&p2=pumpStationReport&p1=report"',
    //             title: "Pumping station",
    //             htmlAttribute: {
    //                 ["area-name"]: '"PUMPSTATION"'
    //                 , ["access-control"]: undefined
    //             },
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/pumpstationReport.png"
    //         },
    //         4: {
    //             onClick: 'window.location = "/goto?reportName=device station&p2=deviceStatus&p1=report"',
    //             title: "Device Status Report",
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/deviceStatus.png"
    //         },
    //         5: {
    //             onClick: 'window.location = "/goto?reportName=current report&p2=currentreport&p1=report"',
    //             title: "Current Reading Report",
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: ".../images/currentReport.png"
    //         }
    //     }
    // }

    // ,
    // Alarms: {
    //     title: "Alarms",
    //     iconClass: "glyphicon glyphicon-cog",
    //     defaultOpen: false,
    //     subTitles: {
    //         0: {
    //             onClick: 'window.location = window.location.origin + "/goto?alarmName=all alarm&p2=allpriority&p1=alarm"',
    //             title: "All Alarms",
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/alarm1_gray.png"
    //         },
    //         1: {

    //             onClick: 'window.location = window.location.origin + "/goto?alarmName=high alarm&p2=highpriority&p1=alarm"',
    //             title: "High",
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/alarm1_orange.png"
    //         },
    //         2: {
    //             onClick: 'window.location = window.location.origin +"/goto?alarmName=medium alarm&p2=mediumpriority&p1=alarm"',
    //             title: "Medium",
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/alarm1_yellow.png"
    //         },
    //         3: {
    //             onClick: 'window.location = window.location.origin +"/goto?alarmName=low alarm&p2=lowpriority&p1=alarm"',
    //             title: "Low",
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary",
    //             optionIcon: "../images/alarm1_red.png"
    //         },
    //     }
    // },
    // User: {
    //     title: "User",
    //     iconClass: "glyphicon glyphicon-cog",
    //     authority: ['Administrator'],
    //     defaultOpen: false,
    //     subTitles: {
    //         0: {
    //             title: "Admin Panel",
    //             onClick: 'window.location = "/adminPanel"',
    //             authority: ['Administrator'],
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary"
    //         },
    //         1: {
    //             onClick: 'window.location = "/changePassword"',
    //             title: "Change Password",
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary"
    //         }
    //     }
    // }

    // ,
    // Config: {
    //     title: "Configuration",
    //     iconClass: "glyphicon glyphicon-cog",
    //     authority: ['Administrator'],
    //     defaultOpen: false,
    //     subTitles: {
    //         0: {
    //             onClick: 'window.location = window.location.origin + "/getTariff"',
    //             title: "Tariff",
    //             authority: ['Administrator'],
    //             iconClass: "glyphicon glyphicon-option-vertical text-primary"
    //         }
    //     }
    // },

}

function ServerCall(details) {
    /*
    props: 
    paras:: json format for parameters, 
    apiCall:: the api to call, 
    successFunc:: function that will be executed if success, if '' nothing will be executed, 
    failFunc:: function that will be executed if NOT success, if '' nothing will be executed, 
    type:: PUT, POST, DELETE, UPDATE request
    */

    /**/
    if (!details.hasOwnProperty("type")) {
        //console.warn("'type' not specified. Default 'POST' will be choosen.");
        details.type = "POST";
    }

    if (!details.hasOwnProperty("paras")) {
        //console.warn("Paras not supplied, empty will be sent");
        details.paras = {};
    }

    if (!details.hasOwnProperty("apiCall")) {
        throw ("need api.");
    }

    if (!details.hasOwnProperty("successFunc")) {
        //console.warn("no 'successFunc' specified");
        details.successFunc = undefined;
    }

    if (!details.hasOwnProperty("failFunc")) {
        //console.warn("no 'failFunc' specified");
    }

    if (!details.hasOwnProperty("timeout")) {
        //console.warn("no 'timeout' specified");
        details.timeout = 0;
    }

    if (!details.hasOwnProperty("complete")) {
        //console.warn("no 'complete' specified");
        details.complete = undefined;
    }

    if (!details.hasOwnProperty("async")) {
        //console.warn("no 'complete' specified");
        details.async = true;
    }


    /*DECODE URL FOR PARAMETER*/
    function GetURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    //var test = JSON && JSON.parse(details.paras) || $.parseJSON(details.paras);
    $.ajax({
        async: details.async,

        type: details.type,
        data: JSON.stringify(details.paras),
        url: serverIp + details.apiCall,
        dataType: "json",
        contentType: 'application/json',

        success: function (response) {
            if (details.successFunc) { details.successFunc(response); }
        },
        failure: function (d) {
            details.failFunc();
        },
        // error: function (d) {
        //     details.failFunc();
        // },
        complete: details.complete, //FIRES AFTER SUCCESS http://api.jquery.com/jquery.ajax/

        timeout: details.timeout
    });

}

/// function to download the data to the csv file

function ArrayToCsv(csvData) {

    if (!csvData.hasOwnProperty("data")) {
        console.warn("No data to convert to CSV found.");
        return;
    }

    var csvContent = "data:text/csv;charset=utf-8,",
        data = [];

    data = csvData.data;
    data.forEach(function (infoArray, index) {

        dataString = infoArray.join(',');
        csvContent += index < data.length ? dataString + "\n" : dataString;

    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);

    link.setAttribute(
        "download", (function () {
            if (csvData.hasOwnProperty("fileName")) {
                return replaceNull(csvData.fileName, "-noName-") + ".csv";
            }

            var d = new Date();
            return (d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + "_" + d.getHours() + ":" + d.getMinutes() + ".csv");

        }).call(this));

    document.body.appendChild(link); // Required for FF

    link.click();

}

/// function to download the data to the excel file

function ToXlsx() {

    //REFER https://github.com/SheetJS/js-xlsx/issues/122

    var a = document.createElement('a');
    a.href = 'data:attachment/xlsx,' + encodeURI(data);
    a.target = '_blank';
    a.download = 'out.xlsx';
    console.log(a);
    document.body.appendChild(a);
    a.click();
}

function AdjustDateTime(o) {

    if (!o.hasOwnProperty("date")) {
        throw ("#20170927.124600 date was <undefined>");
    }
    if (!o.hasOwnProperty("fromFormat")) {
        o.fromFormat = "YY-MMM-DD HH:mm:ss";
    }
    if (!o.hasOwnProperty("format")) {
        o.format = "YYYY-MMM-DD HH:mm:ss";
    }
    var date = o.date, retDate;
    retDate = moment(o.date);

    if (o.hasOwnProperty("hour")) {
        retDate = retDate.subtract(o.hour, "hours");
    }
    if (o.hasOwnProperty("minute")) {
        retDate = retDate.subtract(o.minute, "minutes")
    }
    if (o.hasOwnProperty("subDay")) {
        retDate = retDate.subtract(o.subDay, "days")
    }

    if (o.hasOwnProperty("hour")) {
        retDate = retDate.add(o.hour, "hours");
    }
    if (o.hasOwnProperty("minute")) {
        retDate = retDate.add(o.minute, "minutes")
    }
    if (o.hasOwnProperty("addDay")) {
        retDate = retDate.add(o.addDay, "days")
    }

    if (o.hasOwnProperty("setHour")) {
        retDate = retDate.set({ hour: o.setHour })
    }
    if (o.hasOwnProperty("setMinute")) {
        retDate = retDate.set({ minute: o.setMinute })
    }
    if (o.hasOwnProperty("setSecond")) {
        retDate = retDate.set({ second: o.setSecond })
    }

    return retDate.utc().format(o.format);
}






// function getCookie(c_name) {
//     if (document.cookie.length > 0) {
//         c_start = document.cookie.indexOf(c_name + "=");
//         if (c_start != -1) {
//             c_start = c_start + c_name.length + 1;
//             c_end = document.cookie.indexOf(";", c_start);
//             if (c_end == -1) c_end = document.cookie.length;
//             return unescape(document.cookie.substring(c_start, c_end));
//         }
//     }
//     return "";
// }
// function setCookie(c_name, value, expiredays) {
//     var exdate = new Date();
//     exdate.setDate(exdate.getDate() + expiredays);
//     document.cookie = c_name + "=" + escape(value) +
//         ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
// }
// function checkCookie() {
//     var cookiedata = getCookie();
//     if(cookiedata == "" || cookiedata == false){
//         console.log('ERROR#20180525.105955 cookie false');
//         alert('Some Authorization Issue Please Login Again');
//         window.location = "/";
//     }

//     // username = getCookie('username');
//     // if (username != null && username != "") {
//     //     alert('Welcome again ' + username + '!');
//     // }
//     // else {
//     //     username = prompt('Please enter your name:', "");
//     //     if (username != null && username != "") {
//     //         setCookie('username', username, 365);
//     //     }
//     // }
// }



/**
 * Implements cookie-less JavaScript session variables
 * v1.0
 *
 * By Craig Buckler, Optimalworks.net
 *
 */

if (JSON && JSON.stringify && JSON.parse) var Session = Session || (function () {

    // window object
    var win = window.top || window;

    // session store
    var store = (win.name ? JSON.parse(win.name) : {});

    // save store on page unload
    function Save() {
        win.name = JSON.stringify(store);
    };

    // page unload event
    if (window.addEventListener) window.addEventListener("unload", Save, false);
    else if (window.attachEvent) window.attachEvent("onunload", Save);
    else window.onunload = Save;

    // public methods
    return {

        // set a session variable
        set: function (name, value) {
            store[name] = value;
        },

        // get a session value
        get: function (name) {
            return (store[name] ? store[name] : undefined);
        },

        // clear session
        clear: function () { store = {}; },

        // dump session data
        dump: function () { return JSON.stringify(store); }

    };

})();


function getNotification() {
    ServerCall({
        paras: {},
        apiCall: '/getNotification',
        successFunc: (data) => {
            var table = data[0];
            // var arrData = [];
            for (var i = 0; i <= table.length - 1; i++) {
                var dynNotification = '<li><a href="javascript:void(0);"><div class="icon-circle bg-light-green"><i class="material-icons" id="">' + `${(function () {
                    if (table[i].tagType == 'System') {
                        return 'notification_important'
                    } else if (table[i].tagType == 'Process') {
                        return 'phonelink_ring'
                    } else {
                        return 'record_voice_over'
                    }
                }).call(this)}` + '     </i></div><div class="menu-info"><h4 style="font-size: 12px;">' + table[i].ProjectName + ' <br/>' + table[i].SlaveDeviceName + '<br/> ' + table[i].alarmName +
                    '</h4><p><i class="material-icons">access_time</i>' + table[i].notTime + 'mins ago</p></div></a></li>'

                $('#alarmnotification').append(dynNotification);


                //   var dynNotificationTab = '<div style = "color: black;" class="alert alert-'+ `${(function(){ if (table[i].tagType == 'System') {
                //     return 'info'
                //   } else if (table[i].tagType == 'Process') {
                //     return 'disconnected'
                //   } else {
                //     return 'warning'
                //   }}).call(this)}` +'">&#9673;&nbsp;'+ table[i].alarmName +'&nbsp;Alarm Of Device&nbsp;'+ table[i].SlaveDeviceName +'&nbsp;Of Project&nbsp;'+ table[i].ProjectName + 
                //     '</div>'

                //   $('#notificationTab').append(dynNotificationTab);

            }

            $('#countofnot').append(data[1][0].count);
        }
    })
}

var sess
//function getUserId(){
sess = Session.get();
//   return sess.userId
//}


///// LOGOUT BUTTON
$("#LogOut").on("click", function () {
    ServerCall({
        paras: { 'Uid': sess.userId },
        apiCall: '/logout',
        successFunc: (data) => {
            window.location = "/";
        }
    })
});




function NaiveDict(){
    this.keys = []
    this.values = []
}
NaiveDict.prototype.set = function(key, value){
    this.keys.push(key)
    this.values.push(value)
}
NaiveDict.prototype.get = function(lookupKey){
    for (var i=0;i<this.keys.length;i++){
        var key = this.keys[i];
        if (key === lookupKey) {
            return this.values[i]
        }
    }
}

function HashTable() {
    this.bucketCount = 100000;
    this.buckets = [];
    for (var i = 0; i < this.bucketCount; i++) {
        this.buckets.push(new NaiveDict())
    }
}

HashTable.prototype.hashFunction = function (key) {
    var hash = 0;
    for (var i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i)
    }
    return hash;
}

HashTable.prototype.getBucketIndex = function (key) {
    return this.hashFunction(key) % this.bucketCount
}
HashTable.prototype.getBucket = function (key) {
    return this.buckets[this.getBucketIndex(key)]
}

HashTable.prototype.set = function (key, value) {
    this.getBucket(key).set(key, value)
}
HashTable.prototype.get = function (lookupKey) {
    return this.getBucket(lookupKey).get(lookupKey)
}








//// navigation Menu

// <!-- Top Bar -->
// var pgTitle = '<div class="container-fluid"><div class="navbar-header"></div><a href="javascript:void(0);" id="leftmenu"><i class="material-icons leftmenu">reorder</i></a><a href="/ritz" id="btnHome"><i class="material-icons" style="color: white;">home</i><a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a><a href="javascript:void(0);" class="bars"></a><a class="navbar-brand"</div><div class="collapse navbar-collapse" id="navbar-collapse"> <ul class="nav navbar-nav navbar-right"><li><a href="javascript:void(0);" class="js-search" data-close="true"><i class="material-icons">search</i></a></li><li class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="material-icons">notifications</i></li></ul></div></div>'

// var pgsection = '<aside id="leftsidebar" class="sidebar cls"><div class="user-info"><div class="image"><img src="../images/user.png" width="48" height="48" alt="User" /></div><div class="info-container"><div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="txtUName"></div><div class="email" id="txtEmail"></div><div class="btn-group user-helper-dropdown"><i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i><ul class="dropdown-menu pull-right"><li><a href="javascript:void(0);"><i class="material-icons">person</i>Profile</a></li> <li role="seperator" class="divider"></li><li> <a href="javascript:void(0);" id="LogOut"><i class="material-icons">input</i>Sign Out</a></li></ul></div></div></div><div class="menu"><ul class="list"><li class="header">MAIN NAVIGATION</li><li class="active"><a href="/ritz"><i class="material-icons">home</i><span>Dashboard</span></a></li><li><a href="#"><i class="material-icons">work</i><span>Projects</span></a></li><li><a href="javascript:void(0);" class="menu-toggle"><i class="material-icons">router</i><span>Master Devices</span></a><ul class="ml-menu"><li><a class="waves-effect waves-block" href="javascript:void(0);" class="menu-toggle"><span>All Devices</span></a></li><li><a class="waves-effect waves-block" href="javascript:void(0);" class="menu-toggle"><span>Connected</span></a></li> <li> <a class="waves-effect waves-block" href="javascript:void(0);" class="menu-toggle"><span>Disconnected</span></a></li></ul></li><li><a href="javascript:void(0);" class="menu-toggle"><i class="material-icons">router</i><span>Slave Devices</span></a><ul class="ml-menu"><li><a class="waves-effect waves-block" href="javascript:void(0);" class="menu-toggle"><span>All Devices</span></a></li><li><a class="waves-effect waves-block" href="javascript:void(0);" class="menu-toggle"><span>Connected</span> </a></li><li><a class="waves-effect waves-block" href="javascript:void(0);" class="menu-toggle"><span>Disconnected</span></a></li></ul></li><li><a href="/Tree"><i class="material-icons">list_alt</i><span>Configuration</span></a></li><li class="header">ALARMS</li><li><a href="javascript:void(0);"><i class="material-icons col-red">donut_large</i><span>System alarms</span></a></li><li><a href="javascript:void(0);"><i class="material-icons col-amber">donut_large</i><span>Process alrms</span></a></li><li><a href="javascript:void(0);"><i class="material-icons col-light-blue">portable_wifi_off</i><span>Communication</span></a></li></ul></div><div class="legal"><div class="copyright">&copy; 2018 - 2019<a href="http://www.saisanket.com/">SAISANKET SUPPORT CENTER</a>.</div><div class="version"><b>Version: </b> 1.0.0</div></div></aside><aside id="rightsidebar" class="right-sidebar"><h3 class="header" style="text-align: center;margin-top: 0;background: linear-gradient(110deg, #03A9F4 60%, #00BCD4 60%);">MQTT Connection</h3><div class="menu"><div class="slimScrollDiv"><ul class="list"><li id="mqttSettings"></li></ul></div></div></aside>'





