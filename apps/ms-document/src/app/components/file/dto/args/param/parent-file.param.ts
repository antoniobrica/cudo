import { Field, InputType } from '@nestjs/graphql';
import { ReferenceTypeEnum } from '../../../../../enum/reference-type.enum';

@InputType()
export class ParentFileParams {

  @Field({ nullable: true, description: `Parent file Version ID` })
  uploadedFileID?: string

  @Field({ nullable: true, description: `ReferenceID ` })
  referenceID: string;

  @Field(() => ReferenceTypeEnum, { nullable: true, description: `Reference Type` })
  referenceType: ReferenceTypeEnum;

}
