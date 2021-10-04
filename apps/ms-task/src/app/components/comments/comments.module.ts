import { Module } from '@nestjs/common';
import { CommentsResolver } from './resolver/comments.resolver';
import { CommentsService } from './service/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TaskCommentsEntity from '../../entities/task-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskCommentsEntity])],
  providers: [CommentsResolver, CommentsService
  ],
  exports: [CommentsService, CommentsResolver]
})
export class CommentsModule { }
