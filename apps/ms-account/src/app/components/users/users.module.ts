import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersEntity from '../../entities/users.entity';
import { ReferenceModule } from '../reference/reference.module';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]), ReferenceModule],
    providers: [UserResolver, UserService
    ],
    exports: [UserService, UserResolver]
})
export class UsersModule { }
