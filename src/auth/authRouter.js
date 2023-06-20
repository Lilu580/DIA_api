import { Router } from "express";
import { authorization, getUsers, registration } from "./authController.js";

const authRouter = new Router();

authRouter.post("/registration", registration);
authRouter.post("/authorization", authorization);
authRouter.get("/users", getUsers);

export default authRouter;
