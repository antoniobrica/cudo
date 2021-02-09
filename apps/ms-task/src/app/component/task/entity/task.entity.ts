import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, Length } from 'class-validator';

@ObjectType()
@Entity({ name: 'tasks' })
export class TaskEntity {
  @Field()
  @Column()
  taskId: string;

  @Field()
  @Length(1,20)
  @Column({type:"text", unique:true})
  @IsNotEmpty()
  @PrimaryColumn()
  taskTitle: string;

  @Field({nullable:true})
  @Column()
  description?: string;

  @Field({nullable:true})
  @Column({type:'date'})
  @IsOptional()
  @IsDate()
  startDate?: any

  @Field({nullable:true})
  @Column({type:'date'})
  @IsOptional()
  @IsDate()
  endDate?: any

  @Field({nullable:true})
  @Column()
  @IsOptional()
  estimateDays?: number 
}



  
  
