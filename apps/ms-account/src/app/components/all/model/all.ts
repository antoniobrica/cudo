import { Field, ObjectType } from '@nestjs/graphql';
import { FileStructureModel } from '../../fileStructure/model/fileStructure.model';
import { FileTypeModel } from '../../filetype/model/filetype.model';
import { FolderModel } from '../../folder/model/folder.model';
import { phaseModel } from '../../Phase/model/phase.model';
import { ReferenceModel } from '../../reference/model/reference.model';
import { WorkTypeModel } from '../../workTypes/model/workTypes.model';

@ObjectType()
export class AllModel {

  @Field(type => [phaseModel])
  phases: phaseModel[]

  @Field(type => [FileTypeModel])
  filetypes: FileTypeModel[]

  @Field(type => [FileStructureModel])
  filestructures: FileStructureModel[]

  @Field(type => [WorkTypeModel])
  worktypes: WorkTypeModel[]
  
  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}



