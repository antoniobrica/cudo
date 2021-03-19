import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatefileInput {

  @Field({description:'type of BKP'})
  fileName: string;

}

