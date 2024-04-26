import { Router } from "express";
import AuthController from "../Controllers/AuthController.js";
import ProfileController from "../Controllers/ProfileController.js";

const router = Router();

router.post("/auth/register",AuthController.register)
router.post("/auth/login",AuthController.login);

//Prifile routes
router.put("/profile/:id",ProfileController.update);


export default router;