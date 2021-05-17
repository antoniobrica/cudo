import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class ProtocolModel {

  @Field()
  protocolTemplateID: string;

  @Field()
  protocolTemplateTitle: string;

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}



