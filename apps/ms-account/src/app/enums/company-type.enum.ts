import { registerEnumType } from "@nestjs/graphql";

export enum ReferenceTypeEnum {
    COMPANY = 'COMPANY',
    PROJECTTYPE = 'PROJECTTYPE',

}
registerEnumType(ReferenceTypeEnum, {
    name: 'ReferenceType',
    description: 'The supported reference type.',
    valuesMap: {
        COMPANY: {
            description: 'Company type reference id',
        },
        PROJECTTYPE: {
            description: 'Project type reference id',
        },
    },
});