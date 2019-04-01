console.log("File.js_Found");

var fs = require('fs')
    , path = require('path')
    , express = require('express')
    , app = express()
    , global = require('./Global');

module.exports = {

    writeErrTo: function (params) {

        /*
        IMPLEMENTATION
        file.writeErrTo({ data: `someData ${new Date().toString()}` });
        */

        /*
            params
            data: <text to write>
        */

        var date = new Date(),
            locale = "en-us";

        var directory = `${path.dirname(__dirname)}\\log`
            , fileName = `${date.toLocaleString(locale, { year: "numeric" }).toString()}_${date.toLocaleString(locale, { month: "2-digit" }).toString()}_${date.toLocaleString(locale, { day: "2-digit" }).toString()}.txt`;

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        directory += "\\err"

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        fs.appendFile(`${directory}//${fileName}`, `${params.data} \\r\n`, function (err) {
            if (err) throw err;
            console.log(`error log Saved@ ${global.GetIst()}`);
        });

    }

    , writeLogTo: function (params) {

        /*
        IMPLEMENTATION
        file.writeErrTo({ data: `someData ${new Date().toString()}` });
        */

        /*
            params
            data: <text to write>
        */




        var date = new Date(),
            locale = "en-us";

        var directory = `${path.dirname(__dirname)}\\log`
            , fileName = `${date.toLocaleString(locale, { year: "numeric" }).toString()}_${date.toLocaleString(locale, { month: "2-digit" }).toString()}_${date.toLocaleString(locale, { day: "2-digit" }).toString()}.txt`;


        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        directory += `\\${(function () {
            if (params.hasOwnProperty("directory")) {
                return params.directory
            }
            return "general";
        })()}`

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        fs.appendFile(`${directory}//${fileName}`, `${params.data} \\r\n`, function (err) {
            if (err) throw err;
            console.log(`logType log Saved@ ${global.GetIst()}`);
        });

    }

    , ClearOldLog: (duration) => {

        const date = new Date()
            , locale = "en-us"
            , self = this;
        
        if (!duration) duration = {};

        if (duration.hasOwnProperty("month")) {
            date.setMonth(date.getMonth() - duration.month);
        } else { 
            date.setMonth(date.getMonth() - 1);
        }
        
        if (duration.hasOwnProperty("day")) {
            date.setMonth(date.getDate() - duration.day);
        }
        
        if (duration.hasOwnProperty("year")) {
            date.setMonth(date.getFullYear() - duration.year);
        }

        const logPath = `${path.dirname(__dirname)}//log`
            , dirs = fs.readdirSync(logPath).filter(f => fs.statSync(path.join(logPath, f)).isDirectory())
            , deleteFilesBefore = parseInt(`${date.toLocaleString(locale, { year: "numeric" })}${date.toLocaleString(locale, { month: "2-digit" })}${date.toLocaleString(locale, { day: "2-digit" }).toString()}`);

        dirs.forEach(function (element) {
            fs.readdir(`${logPath}\\${element}`, (err, files) => {
                //console.log(`-${element}`);
                files.forEach(file => {
                    //console.log(`|--${file}`);
                    let fileDate = parseInt((file.split("_").join("")).split(".txt").join("")); //REMOVE '_' AND '.txt' FROM FILE NAME
                    if (!isNaN(fileDate)) {
                        if (fileDate < deleteFilesBefore) { 
                            fs.unlink(`${logPath}\\${element}\\${file}`, function(error) {
                                if (error) {
                                    throw error;
                                }
                                console.log(`Deleted ${logPath}\\${element}\\${file}`);
                            });
                        }
                    }
                });
            })
        });

    }
}