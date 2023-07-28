import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmService } from '../config/typeorm/type-orm.service';
import { SecretService } from '@cudo/ms-core';
import { ComponentsModule } from './components/components.module';
import loggerMiddleware from './middlewares/logger.middleware';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req, connection }) =>
        connection ? { req: connection.context } : { req },
      buildSchemaOptions: {
        fieldMiddleware: [loggerMiddleware],
      },
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    ComponentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SecretService],
})


export class AppModule {}
