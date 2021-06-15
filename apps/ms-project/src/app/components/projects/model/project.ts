import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProjectWorkTypeModel } from '../../ProjectWorkType/model/projecWorkTypes.model';
import { ReferenceModel } from '../../reference/model/reference.model';
import { WorkTypeModel } from '../../workTypes/model/workTypes.model';

@ObjectType()
export class ProjectModel {

  @Field()
  projectId?: string;

  @Field()
  projectName?: string;

  @Field()
  projectNum?: number

  @Field()
  client?: string;

  @Field({ nullable: true })
  buildingType?: string;

  @Field({ nullable: true })
  printingCom?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  @CreateDateColumn()
  createdAt?: Date

  @Field({ nullable: true })
  createdBy?: string;

  @Field()
  @UpdateDateColumn()
  updatedAt?: Date

  @Field({ nullable: true })
  updatedBy?: string;

  @Field({ nullable: true })
  addressLineOne?: string;

  @Field({nullable: true })
  addressLineTwo?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true  })
  state?: string;

  @Field({ nullable: true  })
  zip?: string;

  @Field({ nullable: true  })
  country?: string;

  @Field()
  reference?: ReferenceModel

  @Field(type => [ProjectWorkTypeModel])
  projectWorkTypes: ProjectWorkTypeModel[]
}



