import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommentsModel {

    @Field({ nullable: true, description: `commentsID` })
    commentsID?: string;

    @Field({ description: `uploadedFileID of comments` })
    uploadedFileID: string;

    @Field({ description: `comment of comments` })
    comment: string;
    
    @Field({ nullable: true, description: `comment created by` })
    createdBy?: string;

    @Field()
    createdAt?: Date;

    @Field()
    updatedAt?: Date;

    @Field({ description: `comment deleted or not` })
    isDeleted?: boolean;

}
