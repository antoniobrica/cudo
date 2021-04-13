import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { blobModel } from '@cudo/ms-core';
import { SasGeneratorService } from '@cudo/ms-core';
import BlobParams from 'libs/ms-core/src/lib/common/services/blobstorage/blobparam';

@Resolver(() => blobModel)
export class BlobResolver {
  constructor(
    @Inject(SasGeneratorService) private sasGeneratorService: SasGeneratorService) { }


  @Query(returns => String)
  async accountSASToken(): Promise<string> {
    return await this.sasGeneratorService.getAccountTolen();
  }

  @Query(returns => blobModel)
  async blobSASToken(@Args("container") getContainer: BlobParams): Promise<any> {
    return await this.sasGeneratorService.getSasObject(getContainer);
  }

}