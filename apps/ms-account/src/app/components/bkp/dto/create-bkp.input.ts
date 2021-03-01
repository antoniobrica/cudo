import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBkpInput {

  @Field({description:'BKP ID'})
  bkpID: string;

  @Field({description:'type of BKP'})
  bkpTitle: string;

  @Field({description:'client ID'})
  clientId: number;

  @Field({description:'Company ID'})
  companyId: number
}

