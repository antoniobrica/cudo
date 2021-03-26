import { Field, InputType } from '@nestjs/graphql';
import FileParams from './args/param/file.param';

@InputType()
export class CreateFileInput {

  @Field({description:'File ID'})
  fileURL: string;

  @Field({description:'type of file'})
  fileTitle: string;

  // @Field(type => [FileParams], { description: `Files Array` })
  // Files?: FileParams[];
}



