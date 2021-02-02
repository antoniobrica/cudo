import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '../config/typeorm/type-orm.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './components/projects/projects.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ProjectsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
