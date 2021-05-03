import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class ProtocolFilterArgs {

    @Field({ description: `Protocol ID` })
    protocolID?: string;
}
