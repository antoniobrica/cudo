import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsCreateInputDto } from '../dto/input/comments.add.input.dto';
import { CommentsUpdateInputDto } from '../dto/input/comments.update.input.dto';
import { CommentsDeleteInputDto } from '../dto/input/comments.delete.input.dto';
import CommentsFilterParams from '../dto/input/comments.Filter.input.dto';
import TaskCommentsEntity from '../../../entities/task-comment.entity';
import TaskCustomError from '../../../exceptions/taskCustomError.execption';
import { TaskErrorTypeEnum } from '../../../enums/task-error-type.enum';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(TaskCommentsEntity)
        private commentsRepository: Repository<TaskCommentsEntity>,
    ) { }

    async getComments(commentsFilter: CommentsFilterParams) {
        const comments = await this.commentsRepository.find({ where: { ...commentsFilter, isDeleted: false } });
        if (comments) {
            return comments;
        }
        throw new TaskCustomError(TaskErrorTypeEnum.COMMENT_NOT_FOUND)
    }

    async createComment(commentCreateInput: CommentsCreateInputDto): Promise<TaskCommentsEntity> {
        try {
            const newComment = await this.commentsRepository.create(new TaskCommentsEntity({
                ...commentCreateInput, isDeleted: false
            }));
            await this.commentsRepository.save(newComment);

            return newComment;
        } catch (error) {
            throw new TaskCustomError(TaskErrorTypeEnum.COMMENT_NOT_ADDED)
        }
    }

    async updateComment(commentFilter: CommentsFilterParams, commentUpdateInput: CommentsUpdateInputDto): Promise<TaskCommentsEntity> {
        const { commentsID } = commentFilter
        if (!commentsID) {
            throw new TaskCustomError(TaskErrorTypeEnum.COMMENT_ID_NOT_PROVIDE)
        }
        const commentDetail = await this.commentsRepository.findOne({ where: { commentsID } });
        if (!commentDetail) {
            throw new TaskCustomError(TaskErrorTypeEnum.COMMENT_NOT_FOUND)
        }
        try {
            await this.commentsRepository.update(commentDetail.id, { ...commentUpdateInput });
            const updatedComment = await this.commentsRepository.findOne(commentDetail.id);
            return updatedComment;
        } catch (error) {
            throw new TaskCustomError(TaskErrorTypeEnum.COMMENT_NOT_UPDATED)
        }

    }

    async deleteComment(commentDeleteInputDto: CommentsDeleteInputDto): Promise<TaskCommentsEntity> {
        const { commentsID } = commentDeleteInputDto
        if (!commentsID) {
            throw new TaskCustomError(TaskErrorTypeEnum.COMMENT_ID_NOT_PROVIDE)
        }
        const commentDetail = await this.commentsRepository.findOne({ where: { ...commentDeleteInputDto } });
        if (!commentDetail) {
            throw new TaskCustomError(TaskErrorTypeEnum.COMMENT_NOT_FOUND)
        }

        try {
            // const deleteResponse = await this.commentsRepository.delete(commentDetail.id);
            // if (deleteResponse) {
            //     return deleteResponse;
            // }
            commentDetail.isDeleted = !(commentDetail.isDeleted)
            const updatedCommentDetail = await commentDetail.save()
            return updatedCommentDetail
        } catch (error) {
            throw new TaskCustomError(TaskErrorTypeEnum.COMMENT_NOT_DELETED)
        }
    }
}