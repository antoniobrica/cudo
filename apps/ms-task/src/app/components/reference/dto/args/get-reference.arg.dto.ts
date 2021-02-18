import { ArgsType, Field } from "@nestjs/graphql";
import ObjectWithIdStringDto from "../../../../utils/types/objectWithIdString.dto";

@ArgsType()
export class GetReferenceArgs {
    @Field({ description: `Filter refrence dto` })
    referenceDto: ObjectWithIdStringDto;
}