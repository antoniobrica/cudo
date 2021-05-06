import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProtocolInput {

  @Field({description:'Protocol Title'})
  protocolTemplateTitle: string;

}

