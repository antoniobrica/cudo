import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class DeleteTaskBooleanInput {

   @Field()
   @Column()
   isDeleted?: boolean;
}