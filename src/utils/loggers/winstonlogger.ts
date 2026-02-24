import {createLogger, type LoggerOptions} from 'winston'
import {logger, logMessage, Serverity} from '../../interface/logger';



export class winstonLogger implements logger{

  private logger;
  constructor(opt:LoggerOptions){
    this.logger = createLogger({...opt});
  }

  log(severity:Serverity, message:logMessage):void{
    switch (severity){
      case 'WARN':
        this.logger.warn(message)
      case 'INFO':
        this.logger.info(message);
      case 'ERROR':
        this.logger.error(message);
      case 'DEBUG':
        this.logger.debug(message);
      default:
        this.logger.debug(message);
    }
  }
}
