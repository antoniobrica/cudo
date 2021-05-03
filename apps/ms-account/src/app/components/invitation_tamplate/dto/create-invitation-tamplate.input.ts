import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInvitationTemplateInput {

  @Field({description:'Template for Invitation Title'})
  invitationTemplateTitle: string;

}

