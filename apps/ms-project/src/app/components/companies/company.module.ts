import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../../entities/company.entity';
import { ReferenceModule } from '../reference/reference.module';
import { CompanyResolver } from './resolver/company.resolver';
import { CompanyService } from './service/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), ReferenceModule],
  providers: [CompanyResolver, CompanyService],
})
export class CompanyModule { }
