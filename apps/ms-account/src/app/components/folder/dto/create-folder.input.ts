import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFolderInput {

  @Field({description:'fileType ID'})
  folderID: string;

  @Field({description:'fileType'})
  folderTitle: string;

}

