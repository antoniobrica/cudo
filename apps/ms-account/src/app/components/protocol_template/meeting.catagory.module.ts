import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolEntity } from '../../entities/protocol.entity';
import { ReferenceModule } from '../reference/reference.module';
import { ProtocolTemplateResolver } from './resolver/protocol.resolver';
import { ProtocolTemplateService } from './service/protocol.service';



@Module({
  imports: [TypeOrmModule.forFeature([ProtocolEntity]), ReferenceModule],
  providers: [ProtocolTemplateResolver, ProtocolTemplateService],
  exports: [ProtocolTemplateResolver, ProtocolTemplateService]
})
export class ProtocolTemplateModule { }
