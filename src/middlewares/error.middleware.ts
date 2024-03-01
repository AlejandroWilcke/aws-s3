import { ErrorRequestHandler } from "express";
import { logger } from "../loggers/winston.logger";

const errorMiddleware: ErrorRequestHandler  = (err, req, res, next) => {
  let statusCode: number = 500;
  let message: string = 'Internal Server Error';
  
  if(err.name === 'SequelizeUniqueConstraintError'){
    let errorString = err.errors?.map( ( e: any ) => e.message )
    logger.error(errorString);
    message = errorString;
  }else{
    logger.error(`[${req.method}] [${req.url}] [${err}]`);
    message = err;
  }
  
  return res.status(statusCode).json({ error: message })
};

export default errorMiddleware;