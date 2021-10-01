import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsCreateInputDto } from '../dto/input/comments.add.input.dto';
import { CommentsUpdateInputDto } from '../dto/input/comments.update.input.dto';
import { CommentsDeleteInputDto } from '../dto/input/comments.delete.input.dto';
import CommentsFilterParams from '../dto/input/comments.Filter.input.dto';
import { CommentsModel } from '../model/comments.model';
import { CommentsService } from '../service/comments.service';

@Resolver(() => CommentsModel)
export class CommentsResolver {

    constructor(
        private commentsService: CommentsService,
    ) { }

    @Query(() => [CommentsModel])
    async getAllComments() {
        return await this.commentsService.getAllComments();
    }

    //get comments with filter
    @Query(() => [CommentsModel])
    async getComments(@Args("commentsFilter") commentsFilter?: CommentsFilterParams
    ) {
        const comments = await this.commentsService.getComments(commentsFilter);
        return comments;
    }

    @Mutation(() => CommentsModel)
    async createComment(
        @Args('commentCreateDto') commentCreateInput: CommentsCreateInputDto,
    ) {
        return this.commentsService.createComment(commentCreateInput);
    }

    @Mutation(() => CommentsModel)
    async updateComment(@Args("commentFilter") commentFilter: CommentsFilterParams,
        @Args('commentUpdateDto') commentUpdateInput: CommentsUpdateInputDto,
    ) {
        return this.commentsService.updateComment(commentFilter, commentUpdateInput);
    }

    @Mutation(() => CommentsModel)
    async deleteComment(@Args("commentDeleteInput") commentDeleteInput: CommentsDeleteInputDto
    ) {
        return this.commentsService.deleteComment(commentDeleteInput);
    }
}
