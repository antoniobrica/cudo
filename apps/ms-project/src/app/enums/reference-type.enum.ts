import { registerEnumType } from "@nestjs/graphql";

export enum ReferenceTypeEnum {
    COMPANY = 'COMPANY',
}
registerEnumType(ReferenceTypeEnum, {
    name: 'ReferenceType',
    description: 'The supported reference type.',
    valuesMap: {
        COMPANY: {
            description: 'Project type reference id',
        },
    },
});