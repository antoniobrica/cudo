import { Inject } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { ReferenceInputDto } from '../dto/input/country.input.dto';
import { ReferenceModel } from '../model/country.model';
import { CountryService } from '../service/country.service';

@Resolver(() => ReferenceModel)
export class CountryResolver {

    constructor(
        private countryService: CountryService
    ) { }

    @Query(() => [ReferenceModel])
    async allReferences(
    ) {
        const posts = await this.countryService.getReference();
        return posts.items;
    }

    @Query(() => ReferenceModel)
    async countries(
    ) {
        const posts = await this.countryService.getReferenceById();
        return posts;
    }

    @Mutation(() => ReferenceModel)
    async createReference(
        @Args('countryDetails') countryInput: ReferenceInputDto,
    ) {
        return this.countryService.createReference(countryInput);
    }

}
