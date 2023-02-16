import express from 'express';

import { json } from 'body-parser';

//router
import { helloRouter } from './routes/hello.route';

const app = express();

app.set('trust proxy', true); //trust HTTPS connection
app.use(json());

//api
app.use(helloRouter);

export { app };
