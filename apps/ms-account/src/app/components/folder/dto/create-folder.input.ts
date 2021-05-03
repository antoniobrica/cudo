import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFolderInput {

  @Field({description:'fileType'})
  folderTitle: string;

}

