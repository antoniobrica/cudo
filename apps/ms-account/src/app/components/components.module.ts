import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { ReferenceModule } from './reference/reference.module';
@Module({
  imports: [
    ReferenceModule,
    CountryModule,
  ],
  providers: []
})
export class ComponentsModule { }
