import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBkpInput {

  @Field({description:'BKP ID'})
  bkpID: string;

  @Field({description:'type of BKP'})
  bkpTitle: string;

}

