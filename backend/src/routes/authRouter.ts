import  express  from "express";
import {
  sendRegister,
  signin,
  logout,
  loginUsingGithub,
} from "@/controllers/authControllers";
import { validLogin, validRegister } from "@/middlewares/authMiddlewares";
import { authenticateToken } from "@/middlewares/autentication-middleware"
const routerAuth = express.Router()

routerAuth.post("/login", validLogin, signin)
routerAuth.delete("/logout", authenticateToken, logout);
routerAuth.post("/register", validRegister, sendRegister)
routerAuth.post("/logingithub", loginUsingGithub);

export { routerAuth }