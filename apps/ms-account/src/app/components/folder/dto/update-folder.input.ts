import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateFolderInput } from './create-folder.input';

@InputType()
export class UpdateFolder {
  @Field()
  folderID?: string;
}


