import express, { Request, Response } from 'express';
import { codesePool, query } from '../configs/database.config';
const router = express.Router();

router.get('/api/payment', async (req: Request, res: Response) => {
  let { id } = req.body;
  const sqlPayment = `select * from payment where id="${id}"`;
  const data = await query(codesePool, sqlPayment);

  res.send({
    response_status: 1,
    message: 'Payment get successful',
    data: {
      payment: data,
    },
  });
});
export { router as helloRouter };
