import { registerEnumType } from "@nestjs/graphql";

export enum SortEnum {
    ASC = "ASC",
    DESC  = "DESC"
}

registerEnumType(SortEnum, {
    name: 'SORTTASK',
    description: ' task sorting.',
    valuesMap: {
        ASC: {
            description: 'Task in ASC order by Date',
        },
        DESC: {
            description: 'Task in DESC order by Date',
        },
    },
});