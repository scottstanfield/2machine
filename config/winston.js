const split = require('split');
const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { colorize, prettyPrint, combine, uncolorize, timestamp, label, printf, json, simple } = format;

const formatLog = format.combine(
        format.timestamp(),
        format.uncolorize(),
        format.json()
);

const formatConsole = format.combine(
        format.colorize(),
        format.simple()
);


// define the custom settings for each transport (file, console)
var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: formatLog
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: formatConsole
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = new createLogger({
  level: 'debug',
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`

module.exports = logger;

module.exports.stream = split().on('data', function (msg) { 
    logger.info(msg);
});


