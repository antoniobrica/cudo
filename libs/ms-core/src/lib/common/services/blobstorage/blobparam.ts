import { Field, InputType } from '@nestjs/graphql';

@InputType()
class BlobParams {

  @Field({ description: `Container Name` })
  containerName?: string;
}

export default BlobParams;