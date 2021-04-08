import { Field, InputType } from '@nestjs/graphql';
import PeopleParams from '../../../utils/types/peopleParams';
import { FileBasicDetailsInput } from './args/file-basic';
import { FileParams } from './args/param/file.param';

@InputType()
export class CreateFileInput {

  @Field(type => FileBasicDetailsInput)
  fileBasics?: FileBasicDetailsInput;

  @Field(type => [FileParams], { description: `Files Array` })
  files?: FileParams[];

  @Field(type => [PeopleParams], { description: `This is for title task title` })
  people?: PeopleParams[];
}



