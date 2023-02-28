import moment from 'moment';
import express, { Request, Response } from 'express';
import { codesePool, query } from '../configs/database.config';
import { produceMessage } from '../producers';
const router = express.Router();

router.get('/api/order', async (req: Request, res: Response) => {
  let { id } = req.body;
  try {
    const sqlGetOrder = `select * from \`order\` where id="${id}"`;
    const data = await query(codesePool, sqlGetOrder);
    res.send({
      response_status: 1,
      message: 'Order get successful',
      data: {
        order: data,
      },
    });
  } catch (error) {
    const sqlLogError = `insert into LogError (log, createdAt) values (?,?)`;
    await query(codesePool, sqlLogError, [
      error.toString(),
      moment().format('YYYY-MM-DDTHH:mm:ss'),
    ]);
  }
});

router.post('/api/order', async (req: Request, res: Response) => {
  let { id, orderName } = req.body;
  try {
    const messageKey = 'HUGO';
    const messageValue = {
      id,
      name: orderName,
    };
    orderName = orderName + 'order';
    const sqlOrder = `insert into \`order\` (id, orderName) values (?,?) `;

    await query(codesePool, sqlOrder, [id, orderName]);
    produceMessage(messageKey, JSON.stringify(messageValue));
    res.send({
      response_status: 1,
      message: 'Order create successful',
    });
  } catch (err) {
    try {
      const sqlDeleteOrder = `delete from \`order\` where id='${id}'`;
      await query(codesePool, sqlDeleteOrder);
    } catch (errDelete) {
      const sqlLogError = `insert into LogError (log, createdAt) values (?,?)`;
      await query(codesePool, sqlLogError, [
        errDelete.toString(),
        moment().format('YYYY-MM-DDTHH:mm:ss'),
      ]);
    }
    res.send({
      response_status: 0,
      message: 'Order create fail.',
      error: err.message,
    });
  }
});
export { router as helloRouter };
