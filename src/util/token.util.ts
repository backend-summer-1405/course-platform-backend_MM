import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { custom_Error } from "../middleware/response_hanlder.ts";



const create_accessToken = (data:object)=>{

 const  JWTsecret = process.env.JWT_ACCESS_SECRET;
 
 if(!JWTsecret) return custom_Error("jwtSecret undefined",500);

 const token = jwt.sign(data,JWTsecret,{expiresIn: "7d"});
  
 return token;
}

const create_tempToken = (data:object)=>{

 const  JWTsecret = process.env.JWT_TEMP_SECRET;
 
 if(!JWTsecret) return custom_Error("jwtSecret undefined",500);

 const token = jwt.sign(data,JWTsecret,{expiresIn: "5m"});
  
 return token;
}

const verify_accessToken = (token:string)=>{

   const  JWTsecret = process.env.JWT_ACCESS_SECRET;
   
   if(!JWTsecret) return custom_Error("jwtSecret undefined",500);

   try{
   const verifyedToken = jwt.verify(token,JWTsecret);

   return verifyedToken

   }catch(error){
      if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        return null;
      }
      if (error.name === 'JsonWebTokenError') {
        return null;
      }
    }
      throw error;
   }
 
}

const verify_tempToken = (token:string)=>{

   const  JWTsecret = process.env.JWT_TEMP_SECRET;
   
   if(!JWTsecret) return custom_Error("jwtSecret undefined",500);

   try{
   const verifyedToken = jwt.verify(token,JWTsecret);

   return verifyedToken

   }catch(error){
      if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        return null;
      }
      if (error.name === 'JsonWebTokenError') {
        return null;
      }
    }
    throw error; 
   }
 
}


export default {
    create_accessToken,
    create_tempToken,
   verify_accessToken,
   verify_tempToken,
}

