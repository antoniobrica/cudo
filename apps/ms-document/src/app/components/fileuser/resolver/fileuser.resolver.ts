import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { FileUserEntity } from '../../../entities/fileuser.entity';
import { FileUserService } from '../service/fileuser.service';

@Resolver(of => FileUserEntity)
export class FileUserResolver {
  constructor(
    @Inject(FileUserService) private fileUserService: FileUserService) { }

    
  @Mutation(returns => FileUserEntity)
  async createFileUser(
    @Args('userId') userId: number,
    @Args('userName') userName: string,
  ): Promise<FileUserEntity> {
    return await this.fileUserService.create({ userName,userId })
  }

  @Query(returns => FileUserEntity)
  async fileuser(@Args('id') id: number): Promise<FileUserEntity> {
    return await this.fileUserService.findOne(id);
  }

  @Query(returns => [FileUserEntity])
  async fileusers(): Promise<FileUserEntity[]> {
    return await this.fileUserService.findAll();
  }
}