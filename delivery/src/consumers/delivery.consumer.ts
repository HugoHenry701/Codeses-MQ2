import moment from 'moment';
import { codesePool, query } from '../configs/database.config';
import { KAFKA_TOPIC } from '../constants/kafka.constant';
import { IConsumer } from '../interfaces/IConsumer.interface';
import { produceMessage, produceRollbackPaymentMessage } from '../producers';

const processor = async ({ topic, partition, message }) => {
  try {
    console.log('-- Start delivery consume payment message --');
    const data = JSON.parse(message.value.toString());
    const { id, name } = data;
    const deliveryName = name + 'delivery';
    const sqlOrder = `insert into delivery (id, deliveryName) values (?,?) `;
    await query(codesePool, sqlOrder, [id, deliveryName]);
  } catch (err) {
    const sqlLogError = `insert into LogError (log, createdAt) values (?,?)`;
    await query(codesePool, sqlLogError, [
      err.toString(),
      moment().format('YYYY-MM-DDTHH:mm:ss'),
    ]);
    produceRollbackPaymentMessage(message.key, message.value);
  }
};

export const PaymentDeliveryConsumer: IConsumer = {
  name: 'payment-to-delivery',
  fromBeginning: false,
  topicSubscribe: KAFKA_TOPIC.PAYMENT,
  groupId: 'operation-group:payment-to-delivery',
  processor,
};
