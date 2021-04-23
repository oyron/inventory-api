const {format, createLogger, transports} = require('winston');
const dateformat = require('dateformat');
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug';
const colorize = process.env.COLORIZE_LOG ? true : false;

const levelToUppercaseFormat = format(info => {
    info.level = info.level.toUpperCase();
    return info;
});

const timestampFormat = format(info => {
    info.timestamp = dateformat(info.timestampt, 'yyyy-mm-dd hh:MM:ss,l');
    return info;
});

const commonFormat = format.combine(
    timestampFormat(),
    format.align(),
    format.printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}`
    })
);

const colorizedFormat = format.combine(
    levelToUppercaseFormat(),
    format.colorize(),
    commonFormat
);

const plainFormat = format.combine(
    levelToUppercaseFormat(),
    commonFormat
);

const consoleTransport = colorize ? new transports.Console({format: colorizedFormat}) : new transports.Console({format: plainFormat});

const logger = createLogger({
        level: logLevel,
        transports: consoleTransport
    })
;

module.exports = logger;
