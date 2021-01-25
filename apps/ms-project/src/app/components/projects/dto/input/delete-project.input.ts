import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteProjectInput {
  @Field()
  @IsNotEmpty()
  projectId: string;
}
