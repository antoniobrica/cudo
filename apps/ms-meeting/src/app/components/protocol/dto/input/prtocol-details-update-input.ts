import { Optional } from "@nestjs/common";
import { Field, InputType } from "@nestjs/graphql";
import ProtocolFilesParams from "../../../../utils/types/protocolFiles.params";
import { ProtocolBasicDetailsUpdateInput } from "./protocol-basic-details-update.input";
import { MeetingDetailsInput } from "../../../meeting/dto/input/meeting-details.input";

@InputType()
export class ProtocolDetailsUpdateInput {

    @Field(type => ProtocolBasicDetailsUpdateInput)
    protocolBasics?: ProtocolBasicDetailsUpdateInput;

    @Field(type => [MeetingDetailsInput], {
        description: `This is for meetings in protocol`, nullable: true
    })
    @Optional()
    public meetings?: MeetingDetailsInput[]

    @Field(type => [ProtocolFilesParams], {
        description: `This is for files in Protocol`, nullable: true
    })
    @Optional()
    public protocolFiles?: ProtocolFilesParams[]
}
