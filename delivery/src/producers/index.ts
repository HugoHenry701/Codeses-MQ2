import { isProducerConnected, producer } from '../configs/kafka.config';
import { KAFKA_TOPIC } from '../constants/kafka.constant';

export async function produceMessage(key: string, value: string) {
  if (isProducerConnected) {
    await producer.send({
      topic: KAFKA_TOPIC.DELIVERY,
      messages: [
        {
          key,
          value,
        },
      ],
    });
  }
}
export async function produceRollbackPaymentMessage(
  key: string,
  value: string
) {
  if (isProducerConnected) {
    await producer.send({
      topic: KAFKA_TOPIC.ROLLBACK_PAYMENT,
      messages: [
        {
          key,
          value,
        },
      ],
    });
  }
}
