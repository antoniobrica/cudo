import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProjectFileEntity } from '../../../entities/projectfile.entity';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class FileModel {

  @Field({nullable: true})
  fileURL?: string;

  @Field({nullable: true})
  fileTitle?: string;

  @Field({ nullable: true, description: `BKPID linked with task` })
  BKPID?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  phasesID?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  FileTypeID?: string;
  

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

  // @Field(type => [ProjectFileEntity])
  // projectfile: ProjectFileEntity[]

}



