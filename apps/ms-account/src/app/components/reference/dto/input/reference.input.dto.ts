import { Field, InputType } from '@nestjs/graphql';
import { ReferenceTypeEnum } from '../../../../enums/company-type.enum';
@InputType()
export class ReferenceInputDto {
  @Field({ description: `ReferenceID is for work` })
  referenceID: string;

  @Field((type) => ReferenceTypeEnum)
  referenceType: ReferenceTypeEnum;

  @Field({ description: `Reference name` })
  name: string;

  @Field({ description: `ReferenceID imageUrl` })
  imageUrl: string;

  @Field({ description: `This is for title task title`, nullable: true })
  createdBy?: string;

  @Field({ description: `This is for title task title`, nullable: true })
  updatedBy?: string;

  @Field({ description: `This is for title task title`, nullable: true })
  isDeleted?: boolean;
}
