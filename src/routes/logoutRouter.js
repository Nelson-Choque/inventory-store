import { Router } from "express";

const routerLogout = Router();

import {
  registerUser,
  loginUser,
  // logoutUser,
} from "./../controller/logoutController.js";

routerLogout.post("/registro", registerUser);
routerLogout.post("/login", loginUser);
// router.get("/logout", logoutUser);

export default routerLogout;
