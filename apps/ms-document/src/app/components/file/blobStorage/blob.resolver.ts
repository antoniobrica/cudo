import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { SasGeneratorService } from './blob.service';
import { blobModel } from './blob.model';
import BlobParams from './blobparam';

@Resolver(() =>blobModel)
export class BlobResolver {
    constructor(
        @Inject(SasGeneratorService) private sasGeneratorService: SasGeneratorService) { }


        @Query(returns =>String)
        async sasAccountTocken(): Promise<string> {
          return await this.sasGeneratorService.getAccountTolen();
        }

        @Query(returns =>blobModel)
        async sasObject(@Args("container") getContainer:BlobParams): Promise<any> {
          console.log(getContainer)
          return await this.sasGeneratorService.getSasObject(getContainer);
        }
      
}