import { Field, InputType } from '@nestjs/graphql';
import { CreateBkpInput } from '../../bkp/dto/create-bkp.input';
import { CreateFileStructureInput } from '../../filestructure/dto/create-filestructure.input';
import { CreateFolderInput } from '../../folder/dto/create-folder.input';
import { CreatePhaseInput } from '../../phases/dto/create-phases.input';
import { FileBasicDetailsInput } from './args/file-basic';
import {  FileParams } from './args/param/file.param';

@InputType()
export class CreateFileInput {

  // @Field({description:'File ID'})
  // fileURL: string;

  // @Field({description:'type of file'})
  // fileTitle: string;taskeDetails

  // @Field({nullable:true, description: `BKPID attached with task` })
  // BKPID?: string;

  // @Field({nullable:true, description: `PhaseID attached with task` })
  // phasesID?: string;

  // @Field({ nullable: true, description: `PhaseID linked with task` })
  // FileTypeID?: string;

  @Field(type => FileBasicDetailsInput)
  fileBasics?: FileBasicDetailsInput;

  @Field(type => [FileParams], { description: `Files Array` })
  fileParam?: FileParams[];

  @Field(type => CreateBkpInput)
  bkp?: CreateBkpInput;

  @Field(type => CreatePhaseInput)
  phase?: CreatePhaseInput;

  @Field(type => CreateFileStructureInput)
  filestructure?: CreateFileStructureInput;

  @Field(type => CreateFolderInput)
  folder?: CreateFolderInput;
  
}



