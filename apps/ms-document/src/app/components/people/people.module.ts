import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FileUserService } from './service/fileuser.service';
import { FileUserResolver } from './resolver/fileuser.resolver';
import { PeopleEntity } from '../../entities/people.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity])],
  providers: [FileUserService, FileUserResolver],
  exports: [FileUserService]
})
export class PeopleModule { }
