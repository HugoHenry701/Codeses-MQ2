import { kafkaClient } from '../configs/kafka.config';
import { IConsumer } from '../interfaces/IConsumer.interface';
import { OrderPaymentConsumer } from './payment.consumer';
import { RollbackPaymentConsumer } from './rollback-payment.consumer';

async function initConsumer(consumerInfo: IConsumer) {
  const consumer = kafkaClient.consumer({ groupId: consumerInfo.groupId });
  await consumer.connect();

  await consumer.subscribe({
    topic: consumerInfo.topicSubscribe,
    fromBeginning: consumerInfo.fromBeginning,
  });

  await consumer.run({
    eachMessage: consumerInfo.processor,
    autoCommit: true,
    autoCommitThreshold: 100,
    autoCommitInterval: 5000,
  });
}

async function main() {
  await initConsumer(OrderPaymentConsumer);
  await initConsumer(RollbackPaymentConsumer);
}

main();
