import express from "express";
import user_Controller from "./user_controller.ts";
import { validate } from "../../middleware/error_middleware.ts";
import { register_Validation, login_Validation,Id_Validate } from "./user_validation.ts";
import user_controller from "./user_controller.ts";

const user_route = express.Router();

user_route.get("/",user_Controller.getAllUser);
user_route.get("/userBoard",user_Controller.user_Count);
user_route.get("/:id",user_controller.getUserById);


user_route.post("/register", ...validate(register_Validation), user_Controller.user_Register);
user_route.post("/login", ...validate(login_Validation), user_Controller.user_Login);

user_route.post("/step1_forgetPassword",user_Controller.step1_forgetPassword);
user_route.post("/step2_resetPassword",user_Controller.step2_resetPassword);

user_route.post("/admin/:id",...validate(Id_Validate),user_Controller.AdminAccount);

user_route.delete("/delete/:id",user_Controller.delete_user);



export {
    user_route
}
