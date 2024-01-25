import { Router } from "express";

// controllers
import { login, signup } from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/signup', signup)
userRouter.post('/login', login)

export default userRouter;