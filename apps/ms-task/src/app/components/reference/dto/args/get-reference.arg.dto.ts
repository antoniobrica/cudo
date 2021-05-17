import { ArgsType, Field } from "@nestjs/graphql";
import ReferenceFilterParams from "../../../../utils/types/referenceFilterParams";

@ArgsType()
export class GetReferenceArgs {
    @Field({ description: `Filter reference dto` })
    referenceFilter: ReferenceFilterParams;
}