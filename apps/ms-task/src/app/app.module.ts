import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from 'apps/ms-task/src/app/component/task/task.module'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmService } from '../config/typeorm/type-orm.service';
import { TaskService } from './task/task.service';
import { ComponentsModule } from './components/components.module';
// import { TasksModule } from './task/task.module';
// import { UserModule } from './components/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req, connection }) => connection ? { req: connection.context } : { req },
      autoSchemaFile: true,
    }),

    // TaskModule,
    // TasksModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    // UserModule,
    ComponentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
