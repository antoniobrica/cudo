import { Field, InputType } from '@nestjs/graphql';
import { FileReferenceTypeEnum } from '../../../../../enum/file-reference-type.enum';

@InputType()
export class FileReferenceParams {

  @Field({ nullable: true, description: `File ID` })
  referenceID?: string;

  @Field(type => FileReferenceTypeEnum, { nullable: true, description: `File ID` })
  referenceType?: FileReferenceTypeEnum;

  @Field({ nullable: true, description: `File ID` })
  name?: string;

}
