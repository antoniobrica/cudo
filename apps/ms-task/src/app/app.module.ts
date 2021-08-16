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
    GraphQLModule.forRoot({
      context: ({ req, connection }) => connection ? { req: connection.context } : { req },
      autoSchemaFile: true,
      debug: false
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
