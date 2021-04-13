import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BlobParams {

  @Field({ description: `Container Name` })
  containerName?: string;
}
