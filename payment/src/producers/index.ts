import { isProducerConnected, producer } from '../configs/kafka.config';
import { KAFKA_TOPIC } from '../constants/kafka.constant';

export async function produceMessage(key: string, value: string) {
  if (isProducerConnected) {
    await producer.send({
      topic: KAFKA_TOPIC.PAYMENT,
      messages: [
        {
          key,
          value,
        },
      ],
    });
  }
}
export async function produceRollbackOrderMessage(key: string, value: string) {
  if (isProducerConnected) {
    await producer.send({
      topic: KAFKA_TOPIC.ROLLBACK_ORDER,
      messages: [
        {
          key,
          value,
        },
      ],
    });
  }
}
