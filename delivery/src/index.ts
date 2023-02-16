import { app } from './app';

const start = async () => {
  console.log('Starting up ......');

  const PORT = 3002;
  app.listen(PORT, () => {
    console.log(`Delivery app is listening at port ${PORT}!!!!!!`);
  });
};

start();
