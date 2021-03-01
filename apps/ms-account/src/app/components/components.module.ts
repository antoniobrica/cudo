import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { ReferenceModule } from './reference/reference.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ReferenceModule,
    CountryModule,
    UsersModule,
  ],
  providers: []
})
export class ComponentsModule { }
