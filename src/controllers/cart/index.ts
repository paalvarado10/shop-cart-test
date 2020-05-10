import * as Joi from '@hapi/joi';
import { Response, Request } from "express";
import { createValidator } from 'express-joi-validation'
import { update, get } from '../../services/cart';
const validator = createValidator()



const getCart = async (req: Request, res: Response) => {
  try {
    const storeId: number = Number(req.params.storeId);
    const carts = await get(storeId);
    return res.json({ carts });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// UPDATE CART
const updateSchema = {
  body: Joi.object({
    quantity: Joi.number().required(),
    id: Joi.string().required(),
    add: Joi.boolean().optional(),
    name: Joi.string().optional(),
    thumb: Joi.string().optional(),
    sku: Joi.string().optional(),
    isBox: Joi.boolean().optional(),
    total: Joi.number().optional(),
    subtotal: Joi.number().optional(),
  }),
  params: Joi.object({
    storeId: Joi.number().required()
  })
}

const updateCart = async (req: Request, res: Response) => {
  try {
    const storeId: number = Number(req.params.storeId);
    const { body } = req;
    const bodyData: iCartDetail = {
      ...body
    }; 
    const cart = await update(storeId, bodyData, body.add);
    return res.json({ cart });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { updateCart, updateSchema, getCart };