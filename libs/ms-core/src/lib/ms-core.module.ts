import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { configuration } from './config/configuration';
import { validationSchema } from "./config/validation";
import { ConfigModule } from "@nestjs/config";
import { CoreResolver } from './resolvers/core.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema
    }),
    // The ConfigModule lives here
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    })
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class MsCoreModule {}
