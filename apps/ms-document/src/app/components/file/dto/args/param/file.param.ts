import { Field, InputType } from '@nestjs/graphql';
import { FileTypeEnum } from '../../../../../enum/file-type.enum';
import { ReferenceTypeEnum } from './../../../../../enum/reference-type.enum';

@InputType()
export class FileParams {

  @Field({ nullable: true, description: `Parent file Version ID` })
  parentFileID?: string;

  @Field({ nullable: true, description: `File URL` })
  fileURL?: string;

  @Field({ nullable: true, description: `File title` })
  fileTitle?: string;

  @Field(() => FileTypeEnum, { nullable: true, description: `PhaseID linked with task` })
  fileType: FileTypeEnum;

  @Field({ nullable: true, description: `File Version` })
  fileVersion?: number;

  @Field({ nullable: true, description: `ReferenceID ` })
  referenceID: string;

  @Field(type => ReferenceTypeEnum, { nullable: true, description: `Reference Type` })
  referenceType: ReferenceTypeEnum;

  @Field({ nullable: true, description: `Reference Title` })
  referenceTitle: string;

}
