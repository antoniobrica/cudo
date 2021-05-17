import { Field, InputType, PartialType } from '@nestjs/graphql';
import PeopleParams from '../../../utils/types/peopleParams';
import { FileBasicDetailsInput } from './args/file-basic';
import { FileParams } from './args/param/file.param';
import { CreateFileInput } from './create-file.input';

@InputType()
export class UpdateFileInput extends PartialType(CreateFileInput) {
  @Field()
  projectFileID?: string;
}


