import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ReferenceModel {

    @Field({ nullable: true, description: `referenceID` })
    referenceID?: string;

    @Field({ nullable: true, description: `referenceType` })
    referenceType?: string;

    @Field({ nullable: true, description: `referenceType` })
    projectID?: string;

    @Field({ nullable: true, description: `referenceType` })
    companyID?: string;

    @Field({ nullable: true, description: `referenceType` })
    name?: string;

    @Field({ description: `Reference updated at` })
    updatedAt?: Date;

    @Field({ description: `Reference created at` })
    createdAt?: Date;

    @Field({ nullable: true, description: `Reference updated By` })
    updatedBy?: string;

    @Field({ nullable: true, description: `Reference created by` })
    createdBy?: string;
}
