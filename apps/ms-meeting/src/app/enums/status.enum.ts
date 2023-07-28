import { registerEnumType } from "@nestjs/graphql";

export enum StatusEnum {
    SCHEDULED = 'SCHEDULED',
    COMPLETED = 'COMPLETED',
}
registerEnumType(StatusEnum, {
    name: 'MEETINGSTATUS',
    description: 'Supported meeting status.',
    valuesMap: {
        SCHEDULED: {
            description: 'Meeting scheduled',
        },
        COMPLETED: {
            description: 'Meeting Completed',
        },
    },
});