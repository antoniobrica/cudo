import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Column, PrimaryColumn } from 'typeorm';

@InputType()
export class CreateProjectInput {

  @Field()
  projectName: string;

  @Field()
  projectNum: number;

  @Field({ nullable: true })
  @IsOptional()
  client: string;

  @Field({ nullable: true })
  @IsOptional()
  buildingType?: string

  @Field({ nullable: true })
  @IsOptional()
  printingCom?: string

  @Field({ nullable: true })
  @IsOptional()
  workType?: string;

  @Field({ nullable: true })
  @IsOptional()
  estCost?: number;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}

