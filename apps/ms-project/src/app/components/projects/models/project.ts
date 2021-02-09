import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class Project {
  @Field()
  projectId: string;
  
  @Field()
  projectName: string;
  
  @Field(() => Int)
  projectNum:number
  
  @Field()
  client: string;
  
  @Field({ nullable: true })
  buildingType?: string;
  
  @Field({ nullable: true })
  printingCom?: string;
  
  @Field({nullable:true})
  workType?: string;
  
  @Field({nullable:true})
  estCost?: number;
  
  @Field({nullable:true})
  adressLine1?: string;
  
  @Field({nullable:true})
  adressLine2?: string;
  
  @Field({nullable:true})
  city?: string;
  
  @Field({nullable:true})
  state?: string;
  
  @Field({nullable:true})
  zip?: number;
  
  @Field({nullable:true})
  country?: string;

  @Field({nullable:true})
  description?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}



