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
        const comments = await this.commentsRepository.find({ where: { ...commentsFilter } });
        if (comments) {
            return comments;
        }
        throw new FileCustomError(FileErrorTypeEnum.COMMENTS_NOT_FOUND)
    }

    async createComment(commentCreateInput: CommentsCreateInputDto): Promise<CommentsEntity> {
        const newComment = await this.commentsRepository.create(new CommentsEntity({
            ...commentCreateInput, isDeleted: false
        }));
        await this.commentsRepository.save(newComment);
        return newComment;
    }

    async updateComment(commentFilter: CommentsFilterParams, commentUpdateInput: CommentsUpdateInputDto): Promise<CommentsEntity> {
        const { commentsID } = commentFilter
        if (!commentsID) {
            throw new FileCustomError(FileErrorTypeEnum.COMMENTS_ID_NOT_PROVIDE)
        }
        const commentDetail = await this.commentsRepository.findOne({ where: { commentsID } });
        if (commentDetail) {
            await this.commentsRepository.update(commentDetail.id, { ...commentUpdateInput });
            const updatedComment = await this.commentsRepository.findOne(commentDetail.id);
            return updatedComment;
        }
        throw new FileCustomError(FileErrorTypeEnum.COMMENTS_NOT_FOUND)

    }

    async deleteComment(commentDeleteInputDto: CommentsDeleteInputDto): Promise<CommentsEntity> {
        const commentDetail = await this.commentsRepository.findOne({ where: { ...commentDeleteInputDto } });
        if (commentDetail) {
            // const deleteResponse = await this.commentsRepository.delete(commentDetail.id);
            // if (deleteResponse) {
            //     return deleteResponse;
            // }
            commentDetail.isDeleted = !(commentDetail.isDeleted)
            const updatedCommentDetail = await commentDetail.save()
            return updatedCommentDetail
        }
        throw new FileCustomError(FileErrorTypeEnum.COMMENTS_NOT_FOUND)
    }
}