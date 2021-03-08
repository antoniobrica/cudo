import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '../config/typeorm/type-orm.service';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentsModule } from './components/components.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req, connection }) => connection ? { req: connection.context } : { req },
      autoSchemaFile: true,
    }),
    ComponentsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
