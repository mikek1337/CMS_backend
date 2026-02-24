import { winstonLogger } from './loggers/winstonlogger';

export function loggerFactory(logger: 'winston' | 'pino', opt:any){
  switch(logger){
    case 'winston':
      return new winstonLogger(opt);
    case 'pino':
      throw new Error("Not implemented");
    default:
      throw new Error("Provider does not exists")
  }
}
