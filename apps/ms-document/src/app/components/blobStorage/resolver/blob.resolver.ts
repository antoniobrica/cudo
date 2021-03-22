import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { blobModel } from '../model/blob.model';
import { SasGeneratorService } from '../service/blob.service';
import BlobParams from '../dto/blobparam';


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
          return await this.sasGeneratorService.getSasObject(getContainer);
        }
      
}