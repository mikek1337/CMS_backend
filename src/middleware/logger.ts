import {Request, Response, NextFunction} from 'express';
import {format, transports} from 'winston';
import { loggerFactory } from '../utils/loggers';
import { logMessage, Serverity } from '../interface/logger';

const {json, timestamp, combine,simple, colorize} = format
const logger = loggerFactory('winston', {
  level: 'info', // Default log level
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json() // Use JSON format for structured logging
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(), // Add colors for console output
        simple()  // Simple format for console
      ),
    }),
    new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'combined.log' }), // Log all levels to another file
  ],
})

export function logHandler(req:Request, res:Response, next:NextFunction){

  const logMessage:logMessage = {
    eventTime: new Date(),
    message: '',
    clientId: '',
    ip: req.ip,
    method: req.method,
    endpoint: req.url,
  };
  logger.log(Serverity.INFO, logMessage);
  req.logMessage = logMessage;
  req.logger = logger;
  next();
}
