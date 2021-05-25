import { Field, ObjectType } from '@nestjs/graphql';
import { FileReferenceModel } from './file-refernce.model';

@ObjectType()
export class FileParamModel {

    @Field({ nullable: true, description: `File ID` })
    uploadedFileID: string;

    @Field({ nullable: true, description: `Parent File ID` })
    parentFileID: string;

    @Field({ nullable: true, description: `file URL` })
    fileURL?: string;

    @Field({ nullable: true, description: `file Name` })
    fileTitle?: string;

    @Field({ nullable: true, description: `file Name` })
    fileType?: string;

    @Field({ nullable: true, description: `file Version` })
    fileVersion?: number;

    @Field(() => [FileReferenceModel], { nullable: true, description: `File referenced` })
    fileReferences: FileReferenceModel[];

    @Field(() => [FileParamModel], { nullable: true, description: `Files inside parent file or folder or BKP` })
    children: FileParamModel[];

}
