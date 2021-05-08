import { Field, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { PaginationParams } from "../../../utils/types/paginationParams";
import { ReferenceModel } from "../../reference/model/reference.model";

@ObjectType()
export class UserModel extends PaginationParams {

    @Field({ nullable: true, description: `User ID` })
    userID: string;

    @Field({ nullable: true, description: `User Name` })
    userName: string;

    @Field({ nullable: true, description: `User Name` })
    imageUrl: string;

    @Field({ nullable: true, description: `User Name` })
    email: string;

    @Field(type => [ReferenceModel])
    references: ReferenceModel[]

}
