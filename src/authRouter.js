import { Router } from "express";
import { getUsers, registration } from "./authController.js";

const router = new Router();

router.post('/registration', registration);
router.get('/users', getUsers);

export default router;
