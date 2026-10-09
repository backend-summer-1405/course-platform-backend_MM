import {prisma} from "../../util/prisma.util.ts";
import type { Request,Response } from "express";

import {response_Handler,custom_Error} from "../../middleware/response_hanlder.ts"

import { AccountType} from "../../types/model_type.ts"

//user

const user_Count = async(req:Request,res:Response)=>{
   
  const [user, teacher, author] = await Promise.all([
    prisma.account.count({ where: { type: AccountType.User } }),
    prisma.account.count({ where: { type: AccountType.Teacher } }),
    prisma.account.count({ where: { type: AccountType.Author } }),
  ]);

  response_Handler({
    statusCode: 200,
    message: 'roles count result',
    data: { user:user, teacher:teacher, author:author},
    res,
  });

}

const editProfile = async(req:Request,res:Response)=>{
    //
}


//admin

const getAllUser = async(req:Request,res:Response)=>{
 
    const users = await prisma.person.findMany({
        omit:{
            password:true
        }
    });

    if(users.length == 0)  response_Handler({statusCode:200,message:"no user exist in database",data:{user:users},res});

   response_Handler({
    statusCode:200,
     message:"all user found",
     data:users,
     res
    });
  
}

const getUserById = async(req:Request,res:Response)=>{
    
    const id = req.params.id as string;
   
    const person = await prisma.person.findFirst({
        where:{id}
        ,include:{
            personImage:true,
            accounts:{
                include:{
                    wallet:true
                }
            }
        },omit:{
            password:true
        }
    })

    if(!person) custom_Error("user not found",404);

    response_Handler({
        statusCode:200,
        message:"user found",
        data:{person},
        res
    })
}


const delete_user = async(req:Request,res:Response)=>{
      const id = req.params.id as string;

      const person = await prisma.person.delete({
        where:{
            id
        }
      })

      response_Handler({
        statusCode:200,
        message:"user removed",
        data:{person},
        res
    })
}


export default {
    user_Count,
   

    getAllUser,
    getUserById,
    delete_user,
    
};
