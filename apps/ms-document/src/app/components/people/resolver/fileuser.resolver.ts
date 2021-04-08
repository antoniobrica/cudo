import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { FileUserService } from '../service/fileuser.service';
import { PeopleEntity } from '../../../entities/people.entity';

@Resolver(of => PeopleEntity)
export class FileUserResolver {
  constructor(
    @Inject(FileUserService) private fileUserService: FileUserService) { }


  @Mutation(returns => PeopleEntity)
  async createFileUser(
    @Args('userId') userId: number,
    @Args('userName') userName: string,
  ): Promise<PeopleEntity> {
    return await this.fileUserService.create({ userName, userId })
  }

  @Query(returns => PeopleEntity)
  async fileuser(@Args('id') id: number): Promise<PeopleEntity> {
    return await this.fileUserService.findOne(id);
  }

  @Query(returns => [PeopleEntity])
  async people(): Promise<PeopleEntity[]> {
    return await this.fileUserService.findAll();
  }
}