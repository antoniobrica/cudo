import { Inject } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';
import { GetReferenceArgs } from '../dto/args/get-reference.arg.dto';
import { ReferenceInputDto } from '../dto/input/reference.input.dto';
import { ReferenceModel } from '../model/reference.model';
import { ReferenceService } from '../service/reference.service';

@Resolver(() => ReferenceModel)
export class ReferenceResolver {

    constructor(
        private referenceService: ReferenceService
    ) { }

    @Query(() => [ReferenceModel])
    async references(
    ) {
        const posts = await this.referenceService.getReference();
        return posts.items;
    }

    @Query(() => ReferenceModel)
    async referencesByProjectID(@Args() getReferenceArgs: GetReferenceArgs
    ) {
        const posts = await this.referenceService.getReferenceById(getReferenceArgs);
        return posts;
    }

    @Mutation(() => ReferenceModel)
    async createReference(
        @Args('referenceDetails') referenceInput: ReferenceInputDto,
    ) {
        return this.referenceService.createReference(referenceInput);
    }

    @Mutation(() => ReferenceModel)
    async updateReference(
        @Args('referenceDetails') referenceInput: ReferenceInputDto,
    ) {
        return this.referenceService.updateReference(referenceInput);
    }

    @Mutation(() => ReferenceModel)
    async deleteReference(@Args() getReferenceArgs: GetReferenceArgs
    ) {
        return this.referenceService.deleteReference(getReferenceArgs);
    }
}
