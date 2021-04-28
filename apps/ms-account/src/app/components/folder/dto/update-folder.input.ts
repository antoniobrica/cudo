import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateFolder {
  @Field()
  folderID?: string;
}


