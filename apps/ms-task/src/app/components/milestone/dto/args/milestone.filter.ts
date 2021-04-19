import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MileStoneFilterParam {

  @Field({ description: `MileStone ID` })
  milestoneID: string;
}

export default MileStoneFilterParam;