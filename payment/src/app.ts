import express from 'express';

import { json } from 'body-parser';

//router
// import { helloRouter } from './routes/hello.route';

//processor
import { OrderPaymentConsumer } from './consumers/payment.consumer';
import { RollbackPaymentConsumer } from './consumers/rollback-payment.consumer';
import { initConsumer } from './consumers';

const app = express();

app.set('trust proxy', true); //trust HTTPS connection
app.use(json());

//api
// app.use(helloRouter);

//consumer
initConsumer(OrderPaymentConsumer);
initConsumer(RollbackPaymentConsumer);

export { app };
