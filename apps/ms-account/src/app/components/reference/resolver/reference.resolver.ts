import { Inject } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { ReferenceInputDto } from '../dto/input/reference.input.dto';
import { ReferenceUpdateInputDto } from '../dto/input/reference.upate.input.dto';
import { ReferenceModel } from '../model/reference.model';
import { ReferenceService } from '../service/reference.service';

@Resolver(() => ReferenceModel)
export class ReferenceResolver {

    constructor(
        private referenceService: ReferenceService
    ) { }

    @Query(() => [ReferenceModel])
    async allReferences(
    ) {
        const references = await this.referenceService.getReference();
        return references.items;
    }

    @Query(() => ReferenceModel)
    async references(@Args("referenceFilter") refFilter?: ReferenceFilterParams
    ) {
        const references = await this.referenceService.getReferenceById(refFilter);
        return references;
    }

    @Mutation(() => ReferenceModel)
    async createReference(
        @Args('referenceDetails') referenceInput: ReferenceInputDto,
    ) {
        return this.referenceService.createReference(referenceInput);
    }

    @Mutation(() => ReferenceModel)
    async deleteReference(@Args("referenceFilter") refFilter: ReferenceFilterParams
    ) {
        return this.referenceService.deleteReference(refFilter);
    }

    @Mutation(() => ReferenceModel)
    async updateReference(@Args("referenceFilter") refFilter: ReferenceFilterParams,
        @Args('referenceUpdateDto') referenceUpdateInput: ReferenceUpdateInputDto,
    ) {
        return this.referenceService.updateReference(refFilter, referenceUpdateInput);
    }
}
