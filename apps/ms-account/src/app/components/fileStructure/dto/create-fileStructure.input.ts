import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileStructureInput {

  @Field({description:'FileStructure ID'})
  fileStructureID: string;

  @Field({description:'fileStructure Title'})
  fileStructureTitle: string;

}

