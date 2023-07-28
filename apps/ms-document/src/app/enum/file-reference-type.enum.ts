import { registerEnumType } from "@nestjs/graphql";

export enum FileReferenceTypeEnum {
    PROJECTTYPE = 'PROJECTTYPE',
    WORKTYPE = 'WORKTYPE',
    TASKTYPE = 'TASKTYPE',
    PROTOCOLTYPE = 'PROTOCOLTYPE',
}
registerEnumType(FileReferenceTypeEnum, {
    name: 'FileReferenceTypeEnum',
    description: 'The supported reference type.',
    valuesMap: {
        PROJECTTYPE: {
            description: 'Project type reference id',
        },
        WORKTYPE: {
            description: 'Work type reference id',
        },
        TASKTYPE: {
            description: 'Task type reference id',
        },
        PROTOCOLTYPE: {
            description: 'Protocol type reference id',
        },
    },
});