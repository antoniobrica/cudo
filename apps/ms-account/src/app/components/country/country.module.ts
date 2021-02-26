import { Module } from '@nestjs/common';
import { CountryResolver } from './resolver/country.resolver';
import { CountryService } from './service/country.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CountryEntity from '../../entities/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountryResolver, CountryService
  ],
  exports: [CountryService, CountryResolver]
})
export class CountryModule { }
