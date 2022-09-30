'use strict';
const fs = require("fs")

class Logger{
    isDebug = false;
    loggerId = false;

    constructor(){

        fs.open("./last_log.log", "w", function(err, file) { if(err) throw err})

        if(!fs.existsSync("./logs")) {

            fs.mkdirSync("./logs")

        }

    }

    writeLog(loggerId, message) {

        fs.appendFileSync("./last_log.log", message, function(err) {if (err) throw err})
        fs.appendFileSync(`./logs/${this.loggerId}`)

    }

    setLoggerId(loggerId) {

        this.loggerId = loggerId

    }

    getLoggerId() {

        return this.loggerId

    }

}