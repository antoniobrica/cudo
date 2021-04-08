import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';
import { FileParamModel } from './file-param.model';
import { PeopleModel } from './people.model';

@ObjectType()
export class FileModel {

  @Field({ description: `PhaseID linked with task` })
  isFolder?: boolean;

  @Field({ description: `PhaseID linked with task` })
  projectFileID?: string;

  @Field({ nullable: true, description: `BKPID linked with task` })
  BKPID?: string;

  @Field({ nullable: true, description: `BKPID linked with task` })
  BKPIDTitle?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  folderName?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  phaseID?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  phaseName?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  fileTypeID?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  fileTypeName?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  structureID: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  structureTitle: string;

  @Field({ nullable: true, description: `file updated at` })
  updatedAt?: Date;

  @Field({ nullable: true, description: `file created at` })
  createdAt?: Date;

  @Field({ nullable: true, description: `file updated By` })
  updatedBy?: string;

  @Field({ nullable: true, description: `file created by` })
  createdBy?: string;

  @Field({ description: `PhaseID linked with task` })
  isEveryOneAllowed?: boolean;

  @Field(type => [FileParamModel], { nullable: true })
  files?: FileParamModel[]

  @Field(type => [PeopleModel], { nullable: true })
  people?: PeopleModel[]

}



