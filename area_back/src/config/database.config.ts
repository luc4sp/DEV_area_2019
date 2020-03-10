import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/models/user/users.entity';

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'area_db',
  synchronize: true,
};
