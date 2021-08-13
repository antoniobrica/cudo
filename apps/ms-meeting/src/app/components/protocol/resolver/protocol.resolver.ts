import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import ProtocolEntity from "../../../entities/protocol.entity";
import SortFilterParam from "../../../utils/types/sortParam";
import StatusFilterParam from "../../../utils/types/status.filter";
import { Pagination } from "../../paginate";
import { pageParams } from "../../paginate/pagination.param";
import { PaginationProtocolModel } from "../../paginate/paginattion.protocol.model";
import ProtocolFilterParam from "../dto/args/protocol.filter";
import { ProtocolDeatilsInput } from "../dto/input/protocol-details.input";
import { ProtocolModel } from "../model/protocol.model";
import { ProtocolService } from "../service/protocol.service";

@Resolver(() => ProtocolModel)
export class ProtocolResolver {
    constructor(private readonly protocolService: ProtocolService) { }

    @Mutation(() => ProtocolModel)
    public async createProtocol(@Args('protocolDetails') createInput: ProtocolDeatilsInput) {
        return this.protocolService.addProtocol(createInput)
    }
 
    @Query(() => PaginationProtocolModel, { nullable: true })
    public async getProtocolList(
        @Args('options', { nullable: true }) options: pageParams,
        @Args('protocolFilter', {nullable: true}) protocolFilter?: ProtocolFilterParam,
        @Args('statusFilter', {nullable: true}) status?: StatusFilterParam,
        @Args('sortFilter', {nullable: true}) sortFilter?: SortFilterParam

    ): Promise<Pagination<ProtocolEntity>> {
        return await this.protocolService.findProtocolList(options, protocolFilter, status, sortFilter)
    }

    @Query(() => ProtocolModel)
    public async getProtocotById() {
        return this.protocolService.findProtocolById()
    }

    @Mutation(() => ProtocolModel)
    public async updateProtocol() {
        return this.protocolService.updateProtocol()
    }

    @Mutation(() => ProtocolModel)
    public async deleteProtocol() {
        return this.protocolService.deleteProtocol()
    }
}