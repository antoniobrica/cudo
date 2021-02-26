import { Inject } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
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
        const posts = await this.referenceService.getReference();
        return posts.items;
    }

    @Query(() => ReferenceModel)
    async references(@Args("referenceFilter") refFilter: ReferenceFilterParams
    ) {
        const posts = await this.referenceService.getReferenceById(refFilter);
        return posts;
    }

    @Mutation(() => ReferenceModel)
    async createReference(
        @Args('referenceDetails') referenceInput: ReferenceInputDto,
    ) {
        return this.referenceService.createReference(referenceInput);
    }

    @Mutation(() => ReferenceModel)
    async updateReference(@Args("referenceFilter") refFilter: ReferenceFilterParams,
        @Args('referenceUpdateDto') referenceUpdateInput: ReferenceUpdateInputDto,
    ) {
        return this.referenceService.updateReference(refFilter, referenceUpdateInput);
    }

    @Mutation(() => ReferenceModel)
    async deleteReference(@Args("referenceFilter") refFilter: ReferenceFilterParams
    ) {
        return this.referenceService.deleteReference(refFilter);
    }
}
