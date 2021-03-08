import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePhaseInput {

  @Field({description:'type of BKP'})
  phaseTitle: string;

}

