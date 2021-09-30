import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommentsModel {

    @Field({ nullable: true, description: `commentsID` })
    commentsID?: string;

    @Field({  nullable: true, description: `parent Uploaded File ID of comments for versions parent` })
    parentUploadedFileID?: string;

    @Field({ description: `uploadedFileID of comments` })
    uploadedFileID: string;

    @Field({ description: `comment of comments` })
    comment: string;
    
    @Field({ nullable: true, description: `comment created by name` })
    createdBy?: string;

    @Field({ nullable: true, description: `Comment created by user email` })
    createdByEmail?: string;

    @Field({ nullable: true, description: `Comment created by user profile url` })
    createdByUrl?: string;
    
    @Field()
    createdAt?: Date;

    @Field()
    updatedAt?: Date;

    @Field({ description: `comment deleted or not` })
    isDeleted?: boolean;

}
