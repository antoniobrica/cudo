import { ArgsType, Field } from "@nestjs/graphql";
import { CompanyTypeEnum } from "../../../../enums/company-type.enum";

@ArgsType()
export class GetCompanyFilterArgs {

    @Field(type => CompanyTypeEnum)
    companyType: CompanyTypeEnum;
}
