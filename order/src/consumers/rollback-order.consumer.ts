import moment from 'moment';
import { codesePool, query } from '../configs/database.config';
import { KAFKA_TOPIC } from '../constants/kafka.constant';
import { IConsumer } from '../interfaces/IConsumer.interface';

const processor = async ({ topic, partition, message }) => {
  try {
    const data = JSON.parse(message.value.toString());
    const { id } = data;
    const sqlDeleteOrder = `delete from \`order\` where id='${id}'`;
    await query(codesePool, sqlDeleteOrder);
  } catch (err) {
    const sqlLogError = `insert into LogError (log, createdAt) values (?,?)`;
    await query(codesePool, sqlLogError, [
      err.toString(),
      moment().format('YYYY-MM-DDTHH:mm:ss'),
    ]);
  }
};

export const RollbackOrderConsumer: IConsumer = {
  name: 'rollback-order',
  fromBeginning: false,
  topicSubscribe: KAFKA_TOPIC.ROLLBACK_ORDER,
  groupId: 'operation-group:rollback-order',
  processor,
};
