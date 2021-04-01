import { registerEnumType } from "@nestjs/graphql";

export enum StatusEnum {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
}
registerEnumType(StatusEnum, {
    name: 'TASKSTATUS',
    description: 'Supported task status.',
    valuesMap: {
        INPROGRESS: {
            description: 'Task in progress',
        },
        COMPLETED: {
            description: 'Task Completed',
        },
    },
});