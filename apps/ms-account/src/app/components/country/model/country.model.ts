import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CountryModel {

    @Field({ nullable: true, description: `Country Name` })
    countryName: string;

    @Field({ nullable: true, description: `Country Code` })
    countryCode: string;

}
