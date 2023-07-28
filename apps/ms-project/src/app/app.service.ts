import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async onModuleInit() {
    const connection = this.manager.connection;
    await connection.runMigrations();
  }
  getData(): { message: string } {
    return { message: 'Welcome to ms-project!' };
  }
}