import { Field, InputType } from "@nestjs/graphql";
import ProtocolFilesParam from "apps/ms-meeting/src/app/utils/types/protocolFiles.params";
import { MeetingDetailsInput } from "../../../meeting/dto/input/meeting-details.input";
import { ProtocolBasicDetailsInput } from "./protocol-basic-details.input";

@InputType()
export class ProtocolDeatilsInput {
    @Field(type => ProtocolBasicDetailsInput, {
        description: `This is for protocol basic details`, nullable:true })
    public protocolBasics?:ProtocolBasicDetailsInput;

    @Field(type => [MeetingDetailsInput], {
        description: `This is for meetings in protocol`, nullable:true
    })
    public meetings?: MeetingDetailsInput[]

    @Field(type => [ProtocolFilesParam], {
        description:`This is for files in Protocol`, nullable:true})
    public protocolFiles?: ProtocolFilesParam[]

}