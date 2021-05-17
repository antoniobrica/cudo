import { registerEnumType } from "@nestjs/graphql";

export enum CompanyTypeEnum {
    PRINTING = 'PRINTING',
    CLIENT = 'CLIENT',
}
registerEnumType(CompanyTypeEnum, {
    name: 'CompanyType',
    description: 'The supported company type.',
    valuesMap: {
        PRINTING: {
            description: 'Company type belongs to printing categories',
        },
        CLIENT: {
            description: 'Company type belongs to client categories',
        },
    },
});