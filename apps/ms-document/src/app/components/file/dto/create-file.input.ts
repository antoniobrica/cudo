import { Field, InputType } from '@nestjs/graphql';
import { FileBasicDetailsInput } from './args/file-basic';
import {  FileParams } from './args/param/file.param';

@InputType()
export class CreateFileInput {

  // @Field({description:'File ID'})
  // fileURL: string;

  // @Field({description:'type of file'})
  // fileTitle: string;taskeDetails

  // @Field({ description: `BKPID attached with task` })
  // BKPID?: string;

  // @Field({ description: `PhaseID attached with task` })
  // phasesID?: string;

  // @Field({ nullable: true, description: `PhaseID linked with task` })
  // FileTypeID?: string;
  @Field(type => FileBasicDetailsInput)
  fileBasics?: FileBasicDetailsInput;

  @Field(type => [FileParams], { description: `Files Array` })
  fileParam?: FileParams[];
}



