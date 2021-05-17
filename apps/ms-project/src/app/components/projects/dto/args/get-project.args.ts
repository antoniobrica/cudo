import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetProjectArgs {
  @Field()
  @IsNotEmpty()
  projectId: string;
}
