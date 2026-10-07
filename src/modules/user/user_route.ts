import express from "express";
import user_Controller from "./user_controller.ts";

const user_route = express.Router();

user_route.get("/",user_Controller.getAllUser);


export {
    user_route
}