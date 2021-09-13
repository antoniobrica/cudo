import { registerEnumType } from "@nestjs/graphql";

export enum StatusEnum {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
}
registerEnumType(StatusEnum, {
    name: 'PINSTATUS',
    description: 'Supported pin status.',
    valuesMap: {
        INPROGRESS: {
            description: 'Pin in progress',
        },
        COMPLETED: {
            description: 'Pin Completed',
        },
    },
});