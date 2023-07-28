import { Field, InputType } from '@nestjs/graphql';
import { FileReferenceTypeEnum } from '../../../../../enum/file-reference-type.enum';

@InputType()
export class FileReferenceParams {

  @Field({ description: `File is referenced with referenceID` })
  referenceID?: string;

  @Field(() => FileReferenceTypeEnum, { description: `File is referenced with referenceID type` })
  referenceType?: FileReferenceTypeEnum;

  @Field({ description: `File is referenced with referenceID title` })
  referenceTitle?: string;

}
