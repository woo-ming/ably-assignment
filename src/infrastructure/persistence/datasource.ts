import 'dotenv/config';
import { DataSource } from 'typeorm';
import register from '../../common/configuration/database.config';

const dataSource = new DataSource({
  ...register(),
});

export default dataSource;
