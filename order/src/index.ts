import { app } from './app';

const start = async () => {
  console.log('Starting up ......');

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Order app is listening at port ${PORT}!!!!!!`);
  });
};

start();
