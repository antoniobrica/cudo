import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmService } from '../config/typeorm/type-orm.service';
import { TaskService } from './task/task.service';
import { ComponentsModule } from './components/components.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: true,
        path: "/api/ms-task/graphql"
      }),
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    ComponentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
