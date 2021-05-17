import { ArgsType, Field } from "@nestjs/graphql";
import { CompanyTypeEnum } from "../../../../enums/company-type.enum";

@ArgsType()
export class CompanyFilterArgs {

    @Field({ description: `Company ID` })
    companyID?: string;

    @Field(type => CompanyTypeEnum)
    companyType: CompanyTypeEnum;
}
