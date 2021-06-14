import { Module } from '@nestjs/common';
import { PinsResolver } from './resolver/pins.resolver';
import { PinsService } from './service/pins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PinsTypeEntity from '../../entities/pins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PinsTypeEntity])],
  providers: [PinsResolver, PinsService
  ],
  exports: [PinsService, PinsResolver]
})
export class PinsModule { }
