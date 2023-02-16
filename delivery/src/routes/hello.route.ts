import express, { Request, Response } from 'express';
import { codesePool, query } from '../configs/database.config';
const router = express.Router();

router.post('/api/delivery', async (req: Request, res: Response) => {
  let { id, deliveryName } = req.body;
  deliveryName = deliveryName + 'delivery';
  const sqlOrder = `insert into delivery (id, deliveryName) values (?,?) `;
  await query(codesePool, sqlOrder, [id, deliveryName]);
  res.send({
    response_status: 1,
    message: 'Delivery create successful',
  });
});
export { router as helloRouter };
