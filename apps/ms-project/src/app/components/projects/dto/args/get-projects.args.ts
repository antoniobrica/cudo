import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetProjectsArgs {
  @Field(() => [String])
  @IsArray()
  projectIds: string[];
}
