import { registerEnumType } from "@nestjs/graphql";

export enum TaskTypeEnum {
    FILE = 'FILE',
    PROTOCOL = 'PROTOCOL',
    PIN = 'PIN'
}
registerEnumType(TaskTypeEnum, {
    name: 'TASKTYPE',
    description: 'Supported task type.',
    valuesMap: {
        FILE: {
            description: 'Task File',
        },
        PROTOCOL: {
            description: 'Task Protocol',
        },
        PIN: {
            description: 'Task Pin',
        },
    },
});