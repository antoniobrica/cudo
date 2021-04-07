import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileParamModel {

    @Field({ description: `file URL` })
    fileURL?: string;
  
    @Field({ description: `file Name` })
    fileTitle?: string;

}
