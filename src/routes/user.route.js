import express, {Router} from "express";
import { authenticateUser, createUserAccount, getCurrentUserProfile, signoutUser, updateUserProfile } from "../controllers/user.controller.js";
import { isAuthentication } from "../middleware/auth.middleware.js";
import upload from "../utils/multer.js"
import { validateSignup } from "../middleware/validation.middleware.js";


const router = Router();

router.post("/signup", validateSignup, createUserAccount);
router.post("/sigin", authenticateUser);
router.post("/signout", signoutUser);

router.get("/profile", isAuthentication, getCurrentUserProfile);
router.patch("/profile", isAuthentication, upload.single("avatar") ,updateUserProfile);

export default router;