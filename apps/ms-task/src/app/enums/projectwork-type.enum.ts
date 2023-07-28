import { registerEnumType } from "@nestjs/graphql";

export enum ProjectWorkTypeEnum {
    PROJECTTYPE = 'PROJECTTYPE',
    WORKTYPE = 'WORKTYPE',
}
registerEnumType(ProjectWorkTypeEnum, {
    name: 'ProjectWorkType',
    description: 'The supported ProjectWork type.',
    valuesMap: {
        PROJECTTYPE: {
            description: 'Project type ',
        },
        WORKTYPE: {
            description: 'Work type ',
        },
    },
});