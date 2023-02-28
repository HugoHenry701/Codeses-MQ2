import express, { Request, Response } from 'express';
import { codesePool, query } from '../configs/database.config';
const router = express.Router();

router.get('/api/delivery', async (req: Request, res: Response) => {
  let { id } = req.body;
  const sqlDelivery = `select * from delivery where id="${id}"`;
  const data = await query(codesePool, sqlDelivery);
  res.send({
    response_status: 1,
    message: 'Delivery get successful',
    data: {
      delivery: data,
    },
  });
});
export { router as helloRouter };
