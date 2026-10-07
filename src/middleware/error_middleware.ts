import { validationResult } from "express-validator";
import type {NextFunction, Request, Response} from "express";


const globalError_Middleware = (error: any, request: Request, response: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  console.log("error :", error.message, statusCode, error);
  response.status(statusCode).json({
    status: statusCode,
    message: error.message,
    error: String(error)
  });
};


const validate = (validations:any):Array<any> => {

    return [
        ...validations,

        (req:Request, res:Response, next:NextFunction) => {

            const errors:any = validationResult(req);

            if (!errors.isEmpty()) {
              return res.status(400).json({
                status: 400,
                success: false,
                message: "Validation failed",
                errors: errors.array().map((err:any) => ({
                  field: err.path,
                  message: err.msg,
                })),
              });
            }

            next();
        }
    ];
};


export {
    validate,
    globalError_Middleware,
   
};
