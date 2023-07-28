import { Field, InputType } from '@nestjs/graphql';
import { FileTypeEnum } from '../../../enum/file-type.enum';
import { ReferenceTypeEnum } from '../../../enum/reference-type.enum';
import PeopleParams from '../../../utils/types/peopleParams';

@InputType()
export class UploadFileInfoInput {

  @Field({ nullable: true, description: `Same as uploadedFileID if file is uploading inside existing directory` })
  parentUploadedFileID?: string;

  @Field({ nullable: true, description: `Directory name either folder name or BKP Title` })
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

  @Field({ nullable: true, description: `File Updated by user` })
  updatedBy?: string;

  @Field({ nullable: true, description: `True if file is deleted` })
  isDeleted?: boolean;

  @Field({ nullable: true, description: `ReferenceID ` })
  referenceID: string;

  @Field(() => ReferenceTypeEnum, { nullable: true, description: `Reference Type` })
  referenceType: ReferenceTypeEnum;

  @Field({ nullable: true, description: `Reference Title` })
  referenceTitle: string;

  @Field(type => [PeopleParams], { description: `People assigned for this file` })
  peoples?: PeopleParams[];
}



