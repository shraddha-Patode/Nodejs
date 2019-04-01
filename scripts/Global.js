console.log("Global.js_Found");
module.exports = {

    debugMode: false,
    cookieName: "Map",
        /*mqttServer: 'mqtt://148.251.43.230:50012'
        , allMqttClients: {}
        , mqttClientConnectionTimeout: 20 * 1000
    
        , */sqlConfig: {

        user: 'sa',
        password: 'gat@123',
        // server: '127.0.0.1:27017', // You can use 'localhost\\instance' to connect to named instance 
        // server:'148.251.43.230',
        //server: '192.168.0.25', // You can use 'localhost\\instance' to connect to named instance 
        server: 'localhost', // You can use 'localhost\\instance' to connect to named instance 
        database: 'Map',
        // timezone: '00:00',

        options: {
            encrypt: false
            //instanceName: 'WIN-2IV3VPTVD6R'
        },

        pool: {
            max: 50,
            min: 0,
            idleTimeoutMillis: 360 * 1000
        },
        useUTC: false
    }

    /*, StringToAscii: function StringToAscii(str, returnArray) {
        var retObj;
        if (returnArray === undefined) {
            returnArray = false;
        }
 
        if (returnArray) {
            retObj = [];
            for (var j = 0; j < str.length; j++) {
                retObj.push(str.charCodeAt(j));
            }
        } else {
            retObj = "";
            for (var j = 0; j < str.length; j++) {
                retObj += str.charCodeAt(j);
            }
        }
 
        return retObj;
 
    }
 
    , AsciiToString: function AsciiToString(buffArr) {
 
        if (buffArr.length === 0) {
            return null;
        }
 
        var retStr = "";
        buffArr.forEach(function (e) {
            //console.log(e);
            //console.log(String.fromCharCode(e));
 
            retStr += String.fromCharCode(e);
 
        })
        return retStr;
 
    }*/

    , EnableAutoMemUsageConsoleLog: true
    , AutoMemUsageTimeout: 60000
    , GetMemUsage: function () {
        try {
            return "-------------------------------- \n MEM USAGE @" + new Date() + ":: \n-RSS::" + Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100 + "MB \n-HEAPTOTAL::" + Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100 + "MB \n-HEAPUSED::" + Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100 + "MB \n-EXTERNAL" + Math.round(process.memoryUsage().external / 1024 / 1024 * 100) / 100 + "MB \n --------------------------------";
        } catch (e) {
            debugger;
            console.log("ERROR WHILE GETTING MEM USAGE.");
        }
    }

    , GetIst: function () {
        var now = new Date();
        return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), (now.getUTCMinutes() + 330), now.getUTCSeconds());
    }

   

}