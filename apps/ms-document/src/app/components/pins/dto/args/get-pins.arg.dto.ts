import { ArgsType, Field } from "@nestjs/graphql";
import PinsFilterParams from "../input/pinsFilter.input";

@ArgsType()
export class GetPinsArgs {
    @Field({ description: `Filter pins dto` })
    pinsFilter: PinsFilterParams;
}