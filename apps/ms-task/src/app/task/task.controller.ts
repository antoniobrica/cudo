import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { Itask } from '../interfaces/tender.interface';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly tenderService: TaskService) {}

  @Get()
  findAll(): Promise<Itask[]> {
    return this.tenderService.find();
  }

  @Post()
  create(@Body() createTenderDto: any) {
    Logger.log(createTenderDto);
    return this.tenderService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tenderService.findAll();
  }
}
