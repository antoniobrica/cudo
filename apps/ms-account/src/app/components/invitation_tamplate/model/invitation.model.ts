import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class InvitationTemplateModel {

  @Field()
  invitationTemplateID: string;

  @Field()
  invitationTemplateTitle: string;

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}



