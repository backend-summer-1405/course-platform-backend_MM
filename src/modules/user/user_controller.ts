import {prisma} from "../../util/prisma.util.ts";
import type { Request,Response,NextFunction,RequestHandler } from "express";
import {response_Handler,custom_Error} from "../../middleware/response_hanlder.ts"

//user

const user_Register = async(req:Request,res:Response)=>{
   
  
}

const user_Login = async(req:Request,res:Response)=>{
  
    
}


const user_Count = async(req:Request,res:Response)=>{
   
  const users = await prisma.person.count({});
        
  response_Handler({statusCode:200,message:"total users result",data:{total:users},res});

}





//admin

const getAllUser = async(req:Request,res:Response)=>{
 
    const users = await prisma.person.findMany({
        omit:{
            password:true
        }
    });

    if(users.length == 0) return response_Handler({statusCode:200,message:"no user exist in database",data:{user:users},res});

   response_Handler({statusCode:200,message:"all user found",data:users,res});
  
}

const getUserById = async(req:Request,res:Response)=>{
   
      const id = req.params;

     const user = await prisma.person.findFirst({
        where:{
            id
        }, omit:{
          password:true
        }
     })

    if(!user) custom_Error("user not found",404);

    response_Handler({statusCode:200,message:"the user found",data:{user:user},res});

}


export default {
    getAllUser,
    getUserById,
    user_Count,
    user_Register,
    user_Login,
    
    
};