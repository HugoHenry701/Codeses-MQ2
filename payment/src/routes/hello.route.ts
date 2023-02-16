import express, { Request, Response } from 'express';
import { codesePool, query } from '../configs/database.config';
const router = express.Router();

router.post('/api/payment', async (req: Request, res: Response) => {
  let { id, paymentName } = req.body;
  paymentName = paymentName + 'payment';
  const sqlOrder = `insert into payment (id, paymentName) values (?,?) `;
  await query(codesePool, sqlOrder, [id, paymentName]);

  res.send({
    response_status: 1,
    message: 'Payment create successful',
  });
});
export { router as helloRouter };
