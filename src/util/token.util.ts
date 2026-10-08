import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { custom_Error } from "../middleware/response_hanlder.ts";



const create_Token = (data:object)=>{

 const  JWTsecret = process.env.JWT_SECRET;
 
 if(!JWTsecret) return custom_Error("jwtSecret undefined",500);

 const token = jwt.sign(data,JWTsecret,{expiresIn: "1h"});
  
 return token;
}

const verify_Token = (token:string)=>{

   const  JWTsecret = process.env.JWT_SECRET;
   
   if(!JWTsecret) return custom_Error("jwtSecret undefined",500);

   try{
   const verifyedToken = jwt.verify(token,JWTsecret);

   return verifyedToken

   }catch(error){
      throw error;
   }
 
}


export default {
    create_Token,
    verify_Token
}

