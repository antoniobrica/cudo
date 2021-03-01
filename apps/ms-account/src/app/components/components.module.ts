import { Module } from '@nestjs/common';
import { BkpModule } from './bkp/bkp.module';
import { CountryModule } from './country/country.module';
import { ReferenceModule } from './reference/reference.module';
@Module({
  imports: [
    ReferenceModule,
    CountryModule,
    BkpModule
  ],
  providers: []
})
export class ComponentsModule { }
