import { Inject } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { CountryInputDto } from '../dto/input/country.input.dto';
import { CountryModel } from '../model/country.model';
import { CountryService } from '../service/country.service';

@Resolver(() => CountryModel)
export class CountryResolver {

    constructor(
        private countryService: CountryService
    ) { }

    @Query(() => [CountryModel])
    async Countries(
    ) {
        const posts = await this.countryService.getCountry();
        return posts.items;
    }

    @Mutation(() => CountryModel)
    async createCountry(
        @Args('countryDetails') countryInput: CountryInputDto,
    ) {
        return this.countryService.createCountry(countryInput);
    }

}
