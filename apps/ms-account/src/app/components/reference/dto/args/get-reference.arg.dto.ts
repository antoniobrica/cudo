import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationParams } from "../../../../utils/types/paginationParams";
import ReferenceFilterParams from "../../../../utils/types/referenceFilterParams";

@ArgsType()
export class GetReferenceArgs extends PaginationParams {
    @Field({ description: `Filter reference dto` })
    referenceFilter?: ReferenceFilterParams;
}