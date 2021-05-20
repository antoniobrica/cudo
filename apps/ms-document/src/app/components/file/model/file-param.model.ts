import { Field, ObjectType } from '@nestjs/graphql';
import { FileReferenceModel } from './file-refernce.model';

@ObjectType()
export class FileParamModel {

    @Field({ nullable: true, description: `File ID` })
    fileID: string;

    @Field({ nullable: true, description: `Major Version File ID` })
    majorFileID: string;

    @Field({ nullable: true, description: `file URL` })
    fileURL?: string;

    @Field({ nullable: true, description: `file Name` })
    fileTitle?: string;

    @Field({ nullable: true, description: `file Name` })
    fileType?: string;

    @Field({ nullable: true, description: `file Version` })
    fileVersion?: string;

    @Field(type => [FileReferenceModel], { nullable: true, description: `Versions of File` })
    fileReferences: FileReferenceModel[];

    @Field(type => [FileParamModel], { nullable: true, description: `Versions of File` })
    children: FileParamModel[];

}
