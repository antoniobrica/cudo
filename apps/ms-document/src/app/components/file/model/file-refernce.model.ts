import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileReferenceModel {

    @Field({ nullable: true, description: `File ID` })
    fileReferenceID?: string;

    @Field({ nullable: true, description: `File ID` })
    referenceID?: string;

    @Field({ nullable: true, description: `File ID` })
    referenceType?: string;

    @Field({ nullable: true, description: `File ID` })
    name?: string;

}
