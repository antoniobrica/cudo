import { registerEnumType } from "@nestjs/graphql";

export enum FileTypeEnum {
    IMAGE = 'IMAGE',
    PDF = 'PDF',
    BIM = 'BIM',
}
registerEnumType(FileTypeEnum, {
    name: 'FileTypeEnum',
    description: 'The supported reference type.',
    valuesMap: {
        IMAGE: {
            description: 'File is image type',
        },
        PDF: {
            description: 'File is PDF type',
        },
        BIM: {
            description: 'File is BIM type',
        }
    },
});