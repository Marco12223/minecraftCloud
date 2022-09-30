'use strict';
const fs = require("fs")
const colours = require("./colours");

class getLogger{
    isDebug = false;
    loggerId = false;
    currDate = null;

    constructor(){

        this.currDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

        fs.open("./last_log.log", "w", function(err, file) { if(err) throw err})

        if(!fs.existsSync("./logs")) {

            fs.mkdirSync("./logs")

        }

    }

    writeLog(loggerId, message) {

        fs.appendFileSync("./last_log.log", message + "\n", function(err) {if (err) throw err})
        fs.appendFileSync(`./logs/${this.loggerId}.log`, message + "\n", function (err) {if(err) throw err})

    }

    setLoggerId(loggerId) {

        this.loggerId = loggerId
        this.info(`Currently loggerId: ${loggerId}`)

    }

    getLoggerId() {

        return this.loggerId

    }

    alert(message) {

        this.writeLog(this.loggerId, message)
        console.log(`${colours.fg.black}[${colours.fg.yellow}${this.currDate}${colours.fg.black}]${colours.reset} ${colours.fg.black}[${colours.fg.red}ALERT${colours.fg.black}] ${colours.fg.red}${message}${colours.reset}`)

    }

    info(message) {

        this.writeLog(this.loggerId, message)
        console.log(`${colours.fg.black}[${colours.fg.yellow}${this.currDate}${colours.fg.black}]${colours.reset} ${colours.fg.black}[${colours.fg.blue}INFO${colours.fg.black}] ${colours.fg.green}${message}${colours.reset}`)

    }

    warning(message) {

        this.writeLog(this.loggerId, message)
        console.log(`${colours.fg.black}[${colours.fg.yellow}${this.currDate}${colours.fg.black}]${colours.reset} ${colours.fg.black}[${colours.fg.yellow}WARNING${colours.fg.black}] ${colours.fg.yellow}${message}${colours.reset}`)

    }

    debug(message) {

        this.writeLog(this.loggerId, message)
        if(this.isDebug) {
            console.log(`${colours.fg.black}[${colours.fg.yellow}${this.currDate}${colours.fg.black}]${colours.reset} ${colours.fg.black}[${colours.fg.blue}DEBUG${colours.fg.black}] ${colours.fg.white}${message}${colours.reset}`)
        }

    }

}

module.exports = {getLogger}