import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CommentsEntity from '../../../entities/comments.entity';
import { FileErrorTypeEnum } from '../../../enum/file-error-type.enum';
import FileCustomError from '../../../exceptions/fileCustomError.exception';
import { CommentsCreateInputDto } from '../dto/input/comments.add.input.dto';
import { CommentsUpdateInputDto } from '../dto/input/comments.update.input.dto';
import { CommentsDeleteInputDto } from '../dto/input/comments.delete.input.dto';
import CommentsFilterParams from '../dto/input/comments.Filter.input.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity)
        private commentsRepository: Repository<CommentsEntity>,
    ) { }

    async getComments(commentsFilter: CommentsFilterParams) {
        const comments = await this.commentsRepository.find({ where: { ...commentsFilter, isDeleted: false } });
        if (comments) {
            return comments;
        }
        throw new FileCustomError(FileErrorTypeEnum.COMMENT_NOT_FOUND)
    }

    async createComment(commentCreateInput: CommentsCreateInputDto): Promise<CommentsEntity> {
        try {
            const newComment = await this.commentsRepository.create(new CommentsEntity({
                ...commentCreateInput, isDeleted: false
            }));
            await this.commentsRepository.save(newComment);

            return newComment;
        } catch (error) {
            throw new FileCustomError(FileErrorTypeEnum.COMMENT_NOT_ADDED)
        }
    }

    async updateComment(commentFilter: CommentsFilterParams, commentUpdateInput: CommentsUpdateInputDto): Promise<CommentsEntity> {
        const { commentsID } = commentFilter
        if (!commentsID) {
            throw new FileCustomError(FileErrorTypeEnum.COMMENT_ID_NOT_PROVIDE)
        }
        const commentDetail = await this.commentsRepository.findOne({ where: { commentsID } });
        if (!commentDetail) {
            throw new FileCustomError(FileErrorTypeEnum.COMMENT_NOT_FOUND)
        }
        try {
            await this.commentsRepository.update(commentDetail.id, { ...commentUpdateInput });
            const updatedComment = await this.commentsRepository.findOne(commentDetail.id);
            return updatedComment;
        } catch (error) {
            throw new FileCustomError(FileErrorTypeEnum.COMMENT_NOT_UPDATED)
        }

    }

    async deleteComment(commentDeleteInputDto: CommentsDeleteInputDto): Promise<CommentsEntity> {
        const { commentsID } = commentDeleteInputDto
        if (!commentsID) {
            throw new FileCustomError(FileErrorTypeEnum.COMMENT_ID_NOT_PROVIDE)
        }
        const commentDetail = await this.commentsRepository.findOne({ where: { ...commentDeleteInputDto } });
        if (!commentDetail) {
            throw new FileCustomError(FileErrorTypeEnum.COMMENT_NOT_FOUND)
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
            throw new FileCustomError(FileErrorTypeEnum.COMMENT_NOT_DELETED)
        }
    }
}