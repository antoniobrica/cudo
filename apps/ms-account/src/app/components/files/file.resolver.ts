// import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
// import { Inject, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { multerOptions } from './file-config';
// import { FileUploadService } from './file.service';
// import { fileEntity } from './file.entity';


// @Resolver('fileUpload')
// export class fileResolver {
//     public constructor(private readonly fileUploadService: FileUploadService) { }

//   @Mutation()
//   @UseInterceptors(FileInterceptor('file', multerOptions))
//   async uploadFile(
//     @Args('fileName') fileName: string,

//   ): Promise<fileEntity> {
//     return await this.fileUploadService.create({ fileName })
//   }

// }