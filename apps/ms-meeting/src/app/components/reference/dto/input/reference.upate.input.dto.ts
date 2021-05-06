import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ReferenceUpdateInputDto {

    @Field({ description: `Reference type name` })
    name: string;

}
