import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProjectWorkTypeModel } from '../../ProjectWorkType/model/projecWorkTypes.model';
import { ReferenceModel } from '../../reference/model/reference.model';
import { WorkTypeModel } from '../../workTypes/model/workTypes.model';

@ObjectType()
export class ProjectModel {
  // @Field()
  // projectId: string;

  @Field()
  projectName: string;

  @Field()
  projectNum: number

  @Field()
  client: string;

  @Field({ nullable: true })
  buildingType?: string;

  @Field({ nullable: true })
  printingCom?: string;

  @Field(()=>[WorkTypeModel])
  workType?: WorkTypeModel[] ;

  @Field(() => [ProjectWorkTypeModel])
  ProjectWork?: ProjectWorkTypeModel[];

  @Field({ nullable: true })
  description?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date


  @Field()
  reference?: ReferenceModel

  @Field(type => [ProjectWorkTypeModel])
  projectWorkTypes: ProjectWorkTypeModel[]
}



