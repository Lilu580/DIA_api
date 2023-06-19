import { Router } from "express";
import { authorization, getUsers, registration } from "./authController.js";

const router = new Router();

router.post('/registration', registration);
router.post('/authorization', authorization);
router.get('/users', getUsers);

export default router;
