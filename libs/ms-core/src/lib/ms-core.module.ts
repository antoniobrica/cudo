import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { ConfigModule } from '@nestjs/config';
import { CoreResolver } from './resolvers/core.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    // The ConfigModule lives here
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   // ... other options
    // }),

    // GraphQLModule.forRoot({
    //   autoSchemaFile: true, // ... or your specific configuration
    //   context: ({ req }) => ({ req }),
    //   serverFactory: (options) => new ApolloServer(options),
    // }),

    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    //   playground: true,
    // })
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class MsCoreModule {}
