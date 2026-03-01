import {Request, Response, NextFunction} from "express";
import { logMessage, Serverity } from '../interface/logger'


export function errorHandler(err:any, req:Request, res:Response, next:NextFunction){

  const log: logMessage = {
    ...req.logMessage,
    message: err.message,
    }
  req.logger.log(Serverity.ERROR, log);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: process.env.NODE_ENV === 'production'? 'Internal server error': message,
  })
}
