import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Column, PrimaryColumn } from 'typeorm';

@InputType()
export class CreateProjectInput {

  @Field({description:'Name of the project'})
  projectName: string;

  @Field({description: 'Project number'})
  projectNum: number;

  @Field({ nullable: true, description:'Client of the project' })
  @IsOptional()
  client: string;

  @Field({ nullable: true, description:'building type from BuildingtypeModule' })
  @IsOptional()
  buildingType?: string

  @Field({ nullable: true,description:'printing company for the project' })
  @IsOptional()
  printingCom?: string

  @Field({ nullable: true, description: 'work type from WorkType Module' })
  @IsOptional()
  workType?: string;

  @Field({ nullable: true })
  @IsOptional()
  estCost?: number;

  @Field({ nullable: true,description:'About the project' })
  @IsOptional()
  description?: string;
}

