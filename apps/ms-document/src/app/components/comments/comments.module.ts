import { Module } from '@nestjs/common';
import { CommentsResolver } from './resolver/comments.resolver';
import { CommentsService } from './service/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentsEntity from '../../entities/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsEntity])],
  providers: [CommentsResolver, CommentsService
  ],
  exports: [CommentsService, CommentsResolver]
})
export class CommentsModule { }
