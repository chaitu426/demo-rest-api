import { NextFunction, Response, Request } from "express";
import {HttpError} from 'http-errors'
import config from "../config/config";

const errorHandler = (err:HttpError, req:Request, res:Response, next:NextFunction)=>{

    const statusCode = res.statusCode || 500;

    res.status(statusCode).json({
        status: statusCode,
        message: err.message,
        stack: config.node_env === "production" ? null : err.stack,
    });
    next();
}

export default errorHandler;  