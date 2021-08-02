import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProtocolDeatilsInput } from "../dto/input/protocol-details.input";
import { ProtocolModel } from "../model/protocol.model";
import { ProtocolService } from "../service/protocol.service";

@Resolver(() => ProtocolModel)
export class ProtocolResolver {
    constructor(private readonly protocolService: ProtocolService){ }

    @Mutation(() => ProtocolModel)
    public async createProtocol(@Args('protocolDetails') createInput: ProtocolDeatilsInput){
        return this.protocolService.addProtocol(createInput)
    }

    @Query(() => ProtocolModel)
    public async getProtocolList(){
        return this.protocolService.findProtocolList()
    }

    @Query(() => ProtocolModel)
    public async getProtocotById(){
        return this.protocolService.findProtocolById()
    }

    @Mutation(() => ProtocolModel)
    public async updateProtocol(){ 
        return this.protocolService.updateProtocol()
    }

    @Mutation(() => ProtocolModel)
    public async deleteProtocol(){
        return this.protocolService.deleteProtocol()
    }
}