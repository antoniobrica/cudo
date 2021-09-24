import { ArgsType, Field } from "@nestjs/graphql";
import CommentsFilterParams from "../input/comments.Filter.input.dto";

@ArgsType()
export class GetCommentsArgs {
    @Field({ description: `Filter comments dto` })
    commentsFilter: CommentsFilterParams;
}