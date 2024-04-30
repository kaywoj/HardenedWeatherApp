import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({ filename: 'application.log', maxsize: 5000000, maxFiles: 5 })
  ]
});

export default logger;