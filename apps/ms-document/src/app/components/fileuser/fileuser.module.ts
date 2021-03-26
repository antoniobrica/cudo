import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FileUserService } from './service/fileuser.service';
import { FileUserResolver } from './resolver/fileuser.resolver';
import { FileUserEntity } from '../../entities/fileuser.entity';


@Module({
  imports: [TypeOrmModule.forFeature([FileUserEntity])],
  providers: [FileUserService, FileUserResolver],
  exports: [FileUserService]
})
export class FileUserModule {}
