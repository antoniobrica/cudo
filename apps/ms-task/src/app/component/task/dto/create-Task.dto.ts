import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Column, PrimaryColumn } from 'typeorm';

@InputType()
export class CreateTaskDto {
  @Field()
  @Length(1,20)
  @Column({type:"text", unique:true})
  @IsNotEmpty()
  @PrimaryColumn()
  taskTitle: string;

  @Field({nullable:true})
  @Length(0,255)
  @IsNotEmpty()
  description?: string;

  @Field({nullable:true})
  @Column()
  @IsOptional()
  @IsDate()
  startDate?: Date

  @Field({nullable:true})
  @Column()
  @IsOptional()
  @IsDate()
  endDate?: Date

  @Field({nullable:true})
  @Column()
  @IsOptional()
  estimateDays?: number
  
}

