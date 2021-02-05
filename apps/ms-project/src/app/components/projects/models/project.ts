import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field()
  projectId: string;
  
  @Field()
  projectName: string;
  
  @Field()
  projectNum:string
  
  @Field()
  client: string;
  
  @Field({ nullable: true })
  buildingType?: string;
  
  @Field({ nullable: true })
  printingCom?: string;
  
  @Field({nullable:true})
  workType?: string;
  
  @Field({nullable:true})
  estCost?: string;
  
  @Field({nullable:true})
  adressLine1?: string;
  
  @Field({nullable:true})
  adressLine2?: string;
  
  @Field({nullable:true})
  city?: string;
  
  @Field({nullable:true})
  state?: string;
  
  @Field({nullable:true})
  zip?: string;
  
  @Field({nullable:true})
  country?: string;
}



