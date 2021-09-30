import { Field, ObjectType } from '@nestjs/graphql';
import { FileTypeEnum } from '../../../enum/file-type.enum';
import { ReferenceTypeEnum } from '../../../enum/reference-type.enum';
import { FileReferenceModel } from './file-refernce.model';
import { PeopleModel } from './people.model';

@ObjectType()
export class UploadedFileModel {

    @Field({ nullable: true, description: `Uploaded file ID` })
    uploadedFileID: string;

    @Field({ nullable: true, description: `Parent uploaded file ID` })
    parentUploadedFileID?: string;

    @Field({ nullable: true, description: `File belongs to directory` })
    directory: string;

    @Field({ nullable: true, description: `Structure Id as per company level configuration` })
    structureID: string;

    @Field({ nullable: true, description: `Structure Name as per company level configuration` })
    structureTitle: string;

    @Field({ nullable: true, description: `BKP ID as per company level configuration` })
    BKPID: string;

    @Field({ nullable: true, description: `BKP Title as per company level configuration` })
    BKPIDTitle: string;

    @Field({ nullable: true, description: `Phase ID as per company level configurationk` })
    phaseID: string;

    @Field({ nullable: true, description: `Phase Title as per company level configurationk` })
    phaseName: string;

    @Field({ nullable: true, description: `True/False Generate file name as per configuration/Provide File Title` })
    generateFileName?: boolean;

    @Field({ nullable: true, description: `File type ID as per company level configurationk` })
    fileTypeID?: string;

    @Field({ nullable: true, description: `File type name as per company level configurationk` })
    fileTypeName?: string;

    @Field({ nullable: true, description: `Every user of this project will be notified if true` })
    isEveryOneAllowed?: boolean;

    @Field({ nullable: true, description: `Blob storage URL` })
    fileURL: string;

    @Field({ nullable: true, description: `File Title` })
    fileTitle: string;

    @Field(() => FileTypeEnum, { nullable: true, description: `File type` })
    fileType: FileTypeEnum;

    @Field({ nullable: true, description: `File Version` })
    fileVersion: number;

    @Field({ nullable: true, description: `File created by user` })
    createdBy?: string;

    @Field({ nullable: true, description: `File Updated at by user` })
    updatedBy?: string;

    @Field({ nullable: true, description: `File created at by user` })
    createdAt?: Date;

    @Field({ nullable: true, description: `File Updated by user` })
    updatedAt?: Date;

    @Field({ nullable: true, description: `True if file is deleted` })
    isDeleted?: boolean;

    @Field({ nullable: true, description: `Count of versions for a file` })
    versionCount?: number;

    @Field({ nullable: true, description: `Count of versions for a parent file with versions` })
    taskCount?: number;

    @Field({ nullable: true, description: `Count of comments for a parent file with versions` })
    commentCount?: number;

    @Field({ nullable: true, description: `ReferenceID ` })
    referenceID: string;

    @Field(() => ReferenceTypeEnum, { nullable: true, description: `Reference Type` })
    referenceType: ReferenceTypeEnum;

    @Field({ description: `Reference Title` })
    referenceTitle: string;

    @Field(() => [FileReferenceModel], { nullable: true, description: `This is for title task title` })
    fileReferences?: FileReferenceModel[];

    @Field(type => [PeopleModel], { nullable: true, description: `This is for title task title` })
    people?: PeopleModel[];

    @Field(type => [UploadedFileModel], { nullable: true, description: `Versions of File` })
    children: UploadedFileModel[];

}
