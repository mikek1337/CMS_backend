export enum Serverity{
  WARN = 'WARN',
  INFO = 'INFO',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG'
}


export interface logMessage{
  eventTime: Date;
  corrolationID?: string;
  message: string;
  ip?: string;
  service?: string;
  endpoint?: string;
  method?: string;
  scriptName?: string;
  userIp?:string;
  clientId: string;
  machineId?:string;
}

export interface logger{
  log: (severity:Serverity, message:logMessage)=>void
}
