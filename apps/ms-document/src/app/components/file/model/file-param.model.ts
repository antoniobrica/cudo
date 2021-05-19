import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileParamModel {

    @Field({ nullable: true, description: `File ID` })
    fileID: string;

    @Field({ nullable: true, description: `file URL` })
    fileURL?: string;

    @Field({ nullable: true, description: `file Name` })
    fileTitle?: string;

    @Field({ nullable: true, description: `file Name` })
    fileType?: string;

    @Field({ nullable: true, description: `file Version` })
    fileVersion?: string;

}
