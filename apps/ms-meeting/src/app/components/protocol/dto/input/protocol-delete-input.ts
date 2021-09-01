import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class ProtocolDeleteInput {

    @Field({ description: `protocolId` })
    protocolId: string;
}
