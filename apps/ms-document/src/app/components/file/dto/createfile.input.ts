import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatefileInput {

 @Field({description:'File Name'})
  fileName: string ;
}

