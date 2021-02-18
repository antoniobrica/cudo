import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetPhaseArgs {
    @Field()
    @IsNotEmpty()
    phaseId: string;
}