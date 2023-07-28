import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileReferenceModel {

    @Field({ nullable: true, description: `Same as Parent uploaded file iD` })
    fileReferenceID?: string;

    @Field({ nullable: true, description: `Reference ID where this file is linked` })
    referenceID?: string;

    @Field({ nullable: true, description: `Reference type where this file is linked` })
    referenceType?: string;

    @Field({ nullable: true, description: `Reference title where this file is linked` })
    referenceTitle?: string;

}
