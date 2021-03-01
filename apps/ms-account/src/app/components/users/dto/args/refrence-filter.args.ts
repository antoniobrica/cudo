import { ArgsType, Field } from "@nestjs/graphql";
import { ReferenceTypeEnum } from "../../../../enums/company-type.enum";

@ArgsType()
export class ReferenceFilterArgs {

    @Field({ description: `Reference ID` })
    referenceID?: string;

    @Field(type => ReferenceTypeEnum)
    refrenceType: ReferenceTypeEnum;
}
