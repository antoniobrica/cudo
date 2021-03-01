import { Inject } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { UserFilterArgs } from '../dto/args/user-filter.args';
import { UserInputDto } from '../dto/input/user.input.dto';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Resolver(() => UserModel)
export class UserResolver {

    constructor(
        private userService: UserService
    ) { }

    @Query(() => [UserModel])
    async users(@Args() userFilterArgs: UserFilterArgs
    ) {
        const users = await this.userService.getUser(userFilterArgs);
        return users;
    }

    @Mutation(() => UserModel)
    async createUser(
        @Args('userDetails') userInput: UserInputDto,
        @Args("referenceFilter") referenceFilter: ReferenceFilterParams
    ) {
        return this.userService.createUser(userInput, referenceFilter);
    }

}
