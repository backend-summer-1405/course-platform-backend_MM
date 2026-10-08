import bcrypt from "bcrypt"
import "dotenv/config.js";

const hash_Password =async (password:string)=>{
   
    const hashed = await bcrypt.hashSync(password,10); 
    return hashed
}

const compare_Password = async(password:string,hashedPassword:string)=>{

    const CheckPassISCorrect = await bcrypt.compareSync(password,hashedPassword);
    return CheckPassISCorrect;
} 

export default {
    compare_Password,
    hash_Password
}

