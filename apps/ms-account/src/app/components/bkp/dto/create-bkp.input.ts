import { Field, InputType, ObjectType } from '@nestjs/graphql';
import loggerMiddleware from '../../../middlewares/logger.middleware';

@InputType()
@ObjectType()
export class CreateBkpInput {

  @Field({ description: 'BKP ID', middleware: [loggerMiddleware] })
  bkpID: string;

  @Field({ description: 'type of BKP', middleware: [loggerMiddleware] })
  bkpTitle: string;

}

