import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProtocol {
  @Field()
  protocolTemplateID?: string;
}


