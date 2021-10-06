import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MileStonesFilterParam {

    @Field({ nullable: true, description: `WorkType ID` })
    worktypeID?: string;

    @Field({ nullable: true, description: `Phase ID` })
    phaseID?: string;
}

export default MileStonesFilterParam;