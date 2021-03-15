import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatefileInput {

  @Field({description:'BKP ID'})
  bkpID: string;

  @Field({description:'type of BKP'})
  fileName: string;

}

