import { registerEnumType } from "@nestjs/graphql";

export enum SortEnum {
    ASC = "ASC",
    DESC  = "DESC"
}

registerEnumType(SortEnum, {
    name: 'SORTMEETING',
    description: 'meeting sorting.',
    valuesMap: {
        ASC: {
            description: 'Meeting in ASC order by Date',
        },
        DESC: {
            description: 'Meeting in DESC order by Date',
        },
    },
});