import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ReferenceTypeEnum } from '../../enums/reference-type.enum';

@InputType()
class CostFilterParams {

  @Field({ description: `Cost ID` })
  costID?: string;
}

export default CostFilterParams