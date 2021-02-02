import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Logger,
  } from '@nestjs/common';
import { Tender } from '../app/interfaces/tender.interface';
import { TenderService } from './tender.service';

@Controller('neworder')
export class TenderController {
    constructor(private readonly tenderService: TenderService) {}
  
    @Get()
    findAll(): Promise<Tender[]> {
    return this.tenderService.findAll();
  }

  @Post()
  create(@Body() createTenderDto: any){
    Logger.log(createTenderDto);
    return this.tenderService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tenderService.findAll();
  }

}

