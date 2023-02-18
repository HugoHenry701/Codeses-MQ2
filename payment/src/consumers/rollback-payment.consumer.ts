import moment from 'moment';
import { codesePool, query } from '../configs/database.config';
import { KAFKA_TOPIC } from '../constants/kafka.constant';
import { IConsumer } from '../interfaces/IConsumer.interface';
import { produceRollbackOrderMessage } from '../producers';

const processor = async ({ topic, partition, message }) => {
  try {
    const data = JSON.parse(message.value.toString());
    const { id } = data;
    const sqlDeletePayment = `delete from \`payment\` where id='${id}'`;
    await query(codesePool, sqlDeletePayment);
    produceRollbackOrderMessage(message.key, message.value);
  } catch (err) {
    const sqlLogError = `insert into LogError (log, createdAt) values (?,?)`;
    await query(codesePool, sqlLogError, [
      err.toString(),
      moment().format('YYYY-MM-DDTHH:mm:ss'),
    ]);
  }
};

export const RollbackPaymentConsumer: IConsumer = {
  name: 'rollback-payment',
  fromBeginning: false,
  topicSubscribe: KAFKA_TOPIC.ROLLBACK_PAYMENT,
  groupId: 'operation-group:rollback-payment',
  processor,
};
