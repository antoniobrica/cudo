import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
    @Field()
    taskId: string;
    
    @Field()
    taskTitle: string;
    
    @Field({nullable:true})
    description?: string;
    
    @Field({nullable:true})
    startDate?: any
    
    @Field({nullable:true})
    endDate?: any
    
    @Field({nullable:true})
    estimateDays?: number 
}

