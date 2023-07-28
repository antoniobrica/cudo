import { Inject } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { UserFilterArgs } from '../dto/args/user-filter.args';
import CompanyParams from '../dto/input/company.input.dto';
import { UserFilterInputDto } from '../dto/input/user.filter.input.dto';
import { UserInputDto } from '../dto/input/user.input.dto';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';
import axios from 'axios';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserModel])
  async generateFlowId() {
    try {
      const response = await axios.get(
        `https://youthful-poitras-uhe0c70luy.projects.oryapis.com/self-service/registration/browser`
      );


      console.log(response.request.res);
      //   res.redirect(response.request.res.responseUrl);
    } catch (error) {
      console.error(error);
      //   res.status(500).send('Error initiating login flow');
    }

    return {};
  }

  @Query(() => [UserModel])
  async userByEmail(@Args() userFilterArgs: UserFilterArgs) {
    const users = await this.userService.getUser(userFilterArgs);
    return users;
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('userDetails') userInput: UserInputDto,
    @Args('referenceFilter') referenceFilter: ReferenceFilterParams
  ) {
    return this.userService.createUser(userInput, referenceFilter);
  }

  @Mutation(() => UserModel)
  async addCompanyToUser(
    @Args('userDetails') userInput: UserFilterInputDto,
    @Args({ name: 'references', type: () => [CompanyParams] }) references: CompanyParams[]
  ) {
    return this.userService.addCompanyToUser(userInput, references);
  }
}
