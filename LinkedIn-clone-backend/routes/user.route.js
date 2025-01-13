import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections, updateProfile, getPublicProfile } from "../Controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:userName", protectRoute, getPublicProfile);
router.put("/profile", protectRoute, updateProfile);
export default router;