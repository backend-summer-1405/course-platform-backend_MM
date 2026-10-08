import {prisma} from "../../util/prisma.util.ts";
import type { Request,Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Prisma } from "../../generated/prisma/client.ts";
import {response_Handler,custom_Error} from "../../middleware/response_hanlder.ts"

import Hash from "../../util/bcrypt.util.ts";
import OtpCode from "../../util/code.util.ts"
import Token from "../../util/token.util.ts"

import type {
    registerRequest,
    loginRequest,
    step1_ForgetPassword,
    step2_ResetPassword,
    userByIdRequest,
     requestId,
   adminRequest
} from "./user_types.ts"

import { AccountType} from "./user_types.ts"



//user

const user_Register = async(req:registerRequest,res:Response)=>{
    const {email,phoneNumber,password} = req.body;

    const existingPerson = await prisma.person.findFirst({
        where: { OR: [{ email }, { phoneNumber }] },
        select: { id: true },
    });

    if (existingPerson) custom_Error("email or phoneNumber is already registered", 409);

    const hashedPassword = await Hash.hash_Password(password);

    try {
        const user = await prisma.person.create({
            data: {
                email:email ? email : null,
                phoneNumber,
                password: hashedPassword,
                accounts: {
                    create: {
                        type: "User",
                        userProfile: { create: {} },
                        wallet: { create: {} },
                    },
                },
            },
            omit: { password: true },
            include: { accounts: { include: { userProfile: true, wallet: true } } },
        });

       
        return response_Handler({statusCode:201,message:"user registered successfully",data:{user},res});

    } catch (error) {
        throw error;
    }
}

const user_Login = async(req:loginRequest,res:Response)=>{
    const {email,phoneNumber,password} = req.body;
    
    const person = await prisma.person.findUnique({
        where: email !== undefined ? { email } : { phoneNumber: phoneNumber! },
        include: { accounts: { where: { type: "User", isActive: true } } },
    });

    if (!person || !(await Hash.compare_Password(password, person.password))) {
        return custom_Error("invalid credentials", 401);
    }

    const account = person.accounts[0];
    if (!account) return custom_Error("no active user account found", 403);

    const Record = { 
      personId: person.id,
      accountId: account.id,
      type: account.type
     }

    const token = Token.create_Token(Record);
    
    return response_Handler({
      statusCode:200,
      message:"login successful",
      data:{user:Record,accessToken:token}
      ,res
    });
}

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


//forgetPassword

const step1_forgetPassword = async(req:step1_ForgetPassword,res:Response)=>{

    const {email,phoneNumber} = req.body;

    const person = await prisma.person.findFirst({
        where:{
            OR:[{email},{phoneNumber}]
        }
    })

    if(!person) {
        custom_Error("user not found",404);
        return
    }

    const OTPCode = OtpCode.generateCode();

    const Hash_OTPCode = OtpCode.hashCode(OTPCode);

    const code = await prisma.otpCode.create({
        data:{
            personId : person.id,
            otpCode : Hash_OTPCode,
            expiresAt : new Date(Date.now() + 60*20*1000)
        }
    })

    response_Handler({
        statusCode:200,
        message:"code sent",
        data:{
           code:OTPCode
        },
        res
    })

}


const step2_resetPassword = async(req:step2_ResetPassword,res:Response)=>{
     
    const {email,phoneNumber,otpCode,newPassword} = req.body;

     const person = await prisma.person.findFirst({
        where:{
            OR:[{email},{phoneNumber}]
        }
    })

    if(!person) {
        custom_Error("user not found",404);
        return
    }

    const Hash_OTPCode = OtpCode.hashCode(otpCode); 
    
    
    const code = await prisma.otpCode.findFirst({
        where:{
            personId:person.id,
            otpCode:Hash_OTPCode
        }
    })

    if(!code) {
        custom_Error("code isnt correct",403);
        return;
    }



    if(code.used == true) custom_Error("code used",403);
    if(code.expiresAt  < new Date()) custom_Error("code is expired",403);

    const new_Password  = await Hash.hash_Password(newPassword);

    const thePerson = await prisma.person.update({
        where:{
            id:person.id
        },
        data:{
            password:new_Password
        },omit:{
            password:true
        }
    })

    const theOTPcode = await prisma.otpCode.delete({
        where:{
            id:code.id
        }
    })

   
   
    response_Handler({
        statusCode:200,
        message:"password reset successfully",
        data:{thePerson},
        res
    })

}



// teacher

 const teacherFormRequest = async(req:Request,res:Response)=>{



 }


//admin

const getAllUser = async(req:Request,res:Response)=>{
 
    const users = await prisma.person.findMany({
        omit:{
            password:true
        }
    });

    if(users.length == 0) return response_Handler({statusCode:200,message:"no user exist in database",data:{user:users},res});

   response_Handler({
    statusCode:200,
     message:"all user found",
     data:users,
     res
    });
  
}

const getUserById = async(req:userByIdRequest,res:Response)=>{
    
    const {id} = req.params;
    const {phoneNumber} = req.body;

    const person = await prisma.person.findFirst({
        where:{OR:[{id},{phoneNumber}]}
        ,include:{
            personImage:true,
            accounts:{
                include:{
                    wallet:true
                }
            }
            


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



const AdminAccount = async(req:adminRequest,res:Response)=>{

    const {phoneNumber,password} = req.body
    const id = req.params.id as string;

    const person = await prisma.person.findUnique({
        where:{
         id,
         phoneNumber 
        }
    })

   if (!person || !(await Hash.compare_Password(password, person.password))) {
        return custom_Error("invalid credentials", 401);
    }

    const account = await prisma.account.findFirst({
        where:{
          AND : [{personId:id},{type:"Admin"}]
        }
    })

    if(account) custom_Error("your admin Account is Active",403);

    const adminAccount = await prisma.account.create({
        data:{
           type:"Admin",
           personId:id,
           wallet: {
              create: {}
             }
        }
    })

    response_Handler({
        statusCode:200,
        message:"your admin account created",
        data:{adminAccount},
        res
    })

    

}



const delete_user = async(req:requestId,res:Response)=>{
      const {id} = req.params;

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
    user_Register,
    user_Login,

    step1_forgetPassword,
    step2_resetPassword,
    
    getAllUser,
    getUserById,
    delete_user,
    AdminAccount
    
};
