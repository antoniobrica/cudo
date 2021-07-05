import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '../config/typeorm/type-orm.service';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentsModule } from './components/components.module';
// import { I18nModule, I18nJsonParser } from 'nestjs-i18n';

@Module({
  imports: [
    // I18nModule.forRoot({
    //   fallbackLanguage: 'en',
    //   parser: I18nJsonParser,
    //   parserOptions: {
    //     path: path.join(__dirname, '/assets/i18n/'),
    //     // add this to enable live translations
    //     watch: true,
    //   },
    // }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: true,
        path: "/api/ms-meeting/graphql"
      }),
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
