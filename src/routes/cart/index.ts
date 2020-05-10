import express = require("express");
import { updateCart, updateSchema, getCart } from "../../controllers/cart";
const router = express.Router();
const validator = require('express-joi-validation').createValidator({})

router.get(
  "/:storeId",
  validator.params(updateSchema.params),
  getCart
);

router.put(
  "/:storeId",
  validator.params(updateSchema.params),
  validator.body(updateSchema.body),
  updateCart
);

export default router;