import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInvitationTemplate {
  @Field()
  invitationTemplateID?: string;
}


