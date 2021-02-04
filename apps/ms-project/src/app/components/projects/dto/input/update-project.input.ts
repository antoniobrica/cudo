import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

@InputType()
export class UpdateProjectInput {
  @Field()
  @IsNotEmpty()
  projectNum: number;

  @Field({nullable: true})
  @IsOptional()
  @IsNotEmpty()
  @Length(0,10)
  client?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0,10)
  buildingType?: string

  @Field({ nullable: true })
  @IsOptional()
  printingCom?: string

  @Field({nullable:true})
  @IsOptional()
  @Length(0,30)
  adressLine1?: string;

  @Field({nullable:true})
  @IsOptional()
  @Length(0,30)
  adressLine2?: string;

  @Field({nullable:true})
  @IsOptional()
  @Length(0,10)
  city?: string;

  @Field({nullable:true})
  @IsOptional()
  state?: string;

  @Field({nullable:true})
  @IsOptional()
  zip?: number;

  @Field({nullable:true})
  @IsOptional()
  country?: string;
}
