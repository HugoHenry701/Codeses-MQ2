import express from 'express';

import { json } from 'body-parser';

//router
// import { helloRouter } from './routes/hello.route';

//processor
import { PaymentDeliveryConsumer } from './consumers/delivery.consumer';
import { initConsumer } from './consumers';

const app = express();

app.set('trust proxy', true); //trust HTTPS connection
app.use(json());

//api
// app.use(helloRouter);

//consumer
initConsumer(PaymentDeliveryConsumer);

export { app };
