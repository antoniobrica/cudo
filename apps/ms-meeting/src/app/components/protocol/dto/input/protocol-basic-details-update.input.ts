import { Field, InputType, PartialType } from "@nestjs/graphql";
import { ProtocolBasicDetailsInput } from "./protocol-basic-details.input";

@InputType()
export class ProtocolBasicDetailsUpdateInput extends PartialType(ProtocolBasicDetailsInput) {

    @Field({ description: `This is for title protocolId` })
    protocolId: string;
}
