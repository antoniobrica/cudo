import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Column, PrimaryColumn } from 'typeorm';

@InputType()
export class CreateProjectInput {
  @Field()
  @Length(1,20)
  @Column({type:"text", unique:true})
  @IsNotEmpty()
  @PrimaryColumn()
  projectName: string;

  @Field()
  @Column({unique:true})
  @PrimaryColumn()
  @IsNotEmpty()
  projectNum: string;

  @Field({ description: `Client Name`, deprecationReason: 'Optional While Updating' })
  @Length(1,10)
  @IsNotEmpty()
  client: string;

  @Field({nullable:true})
  @Length(0,10)
  @IsOptional()
  buildingType?: string

  @Field({nullable:true})
  @Length(0,10)
  @IsOptional()
  printingCom?: string

  @Field({nullable:true})
  @Column()
  @IsOptional()
  workType?: string;

  @Field({nullable:true})
  @Column()
  @IsOptional()
  estCost?: string;

  @Field({nullable:true})
  @Column()
  @IsOptional()
  adressLine1?: string;

  @Field({nullable:true})
  @Column()
  @IsOptional()
  adressLine2?: string;

  @Field({nullable:true})
  @Column()
  @IsOptional()
  city?: string;

  @Field({nullable:true})
  @Column()
  @IsOptional()
  state?: string;

  @Field({nullable:true})
  @Column()
  @IsOptional()
  zip?: string;

  @Field({nullable:true})
  @Column()
  @IsOptional()
  country?: string;
}

