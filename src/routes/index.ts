import { Router } from "express";
import getCart from "./cart/index";
const router = Router();
router.use('/cart', getCart);

export default router;