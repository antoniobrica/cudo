import { registerEnumType } from "@nestjs/graphql";

export enum ReferenceTypeEnum {
    PROJECTTYPE = 'PROJECTTYPE',
    WORKTYPE = 'WORKTYPE',
}
registerEnumType(ReferenceTypeEnum, {
    name: 'ReferenceType',
    description: 'The supported reference type.',
    valuesMap: {
        PROJECTTYPE: {
            description: 'Project type reference id',
        },
        WORKTYPE: {
            description: 'Work type reference id',
        },
    },
});