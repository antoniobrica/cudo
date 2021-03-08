import { ArgsType, Field } from "@nestjs/graphql";
import ReferenceFilterParams from "apps/ms-document/src/app/utils/types/referenceFilterParams";

@ArgsType()
export class GetReferenceArgs {
    @Field({ description: `Filter reference dto` })
    referenceFilter: ReferenceFilterParams;
}