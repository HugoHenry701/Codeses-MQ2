import moment from 'moment';
import { codesePool, query } from '../configs/database.config';
import { KAFKA_TOPIC } from '../constants/kafka.constant';
import { IConsumer } from '../interfaces/IConsumer.interface';
import { produceMessage, produceRollbackOrderMessage } from '../producers';

const processor = async ({ topic, partition, message }) => {
  try {
    console.log('-- Start payment consume order message --');
    const messageKey = 'HUGO';
    const data = JSON.parse(message.value.toString());
    const { id, name } = data;
    const paymentName = name + 'payment';
    const sqlPayment = `insert into payment (id, paymentName) values (?,?) `;
    await query(codesePool, sqlPayment, [id, paymentName]);
    produceMessage(messageKey, JSON.stringify(data));
  } catch (err) {
    const sqlLogError = `insert into LogError (log, createdAt) values (?,?)`;
    await query(codesePool, sqlLogError, [
      err.toString(),
      moment().format('YYYY-MM-DDTHH:mm:ss'),
    ]);
    produceRollbackOrderMessage(message.key, message.value);
  }
};

export const OrderPaymentConsumer: IConsumer = {
  name: 'order-to-payment',
  fromBeginning: false,
  topicSubscribe: KAFKA_TOPIC.ORDER,
  groupId: 'operation-group:order-to-payment',
  processor,
};
