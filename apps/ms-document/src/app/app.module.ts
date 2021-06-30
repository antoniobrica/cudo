import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '../config/typeorm/type-orm.service';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentsModule } from './components/components.module';
import { SecretService } from '@cudo/ms-core'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: true,
        path: "/api/ms-document/graphql"
      }),
    }),
    ComponentsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SecretService],
})
export class AppModule { }
