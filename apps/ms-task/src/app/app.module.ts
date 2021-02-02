import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  TypeOrmService,
} from '../config/typeorm/type-orm.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './components/user/user.module';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
