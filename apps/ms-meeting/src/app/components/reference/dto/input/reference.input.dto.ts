import { Field, InputType } from "@nestjs/graphql";
import { ReferenceTypeEnum } from "apps/ms-meeting/src/app/enums/reference-type.enum";

@InputType()
export class ReferenceInputDto {

    @Field({ description: `ReferenceID is for work` })
    referenceID: string;

    @Field(type => ReferenceTypeEnum, { description: `Refrence type Project or WorkType` })
    referenceType: ReferenceTypeEnum;

    @Field({ description: `Reference type name` })
    name: string;

    @Field({ description: `This is for title task title` })
    createdBy?: string;

    @Field({ description: `This is for title task title` })
    updatedBy?: string;

    @Field({ description: `This is for title task title` })
    isDeleted?: boolean;

}
