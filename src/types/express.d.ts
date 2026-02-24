

import { logMessage } from "../interface/logger";
import { loggerFactory } from "../utils/loggers";


declare global{
namespace Express{
  export interface Request{
    logMessage: logMessage,
    logger: ReturnType<loggerFactory>,
    user:{
      id: string;
    createdAt: Date,
    updatedAt: Date,
    email: string,
    emailVerified: boolean,
    name: string,
    image?: string | null | undefined,
    }
  }
}
}
