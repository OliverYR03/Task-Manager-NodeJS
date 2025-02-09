import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
  updateUser,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateTokens.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, profileSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

router.put('/profile/:id',authRequired, validateSchema(profileSchema), updateUser )
router.get("/verify", verifyToken);
router.get("/profile/:id", authRequired, profile);

export default router;
