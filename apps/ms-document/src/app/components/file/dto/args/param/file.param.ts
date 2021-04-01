import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FileParams {
  @Field({ description: `User ID` })
  fileURL?: string;

  @Field({ description: `User Name` })
  fileTitle?: string;

  // @Field({ nullable: true, description: `BKPID linked with task` })
  // BKPID?: string;

  // @Field({ nullable: true, description: `PhaseID linked with task` })
  // phasesID?: string;

  // @Field({ nullable: true, description: `PhaseID linked with task` })
  // FileTypeID?: string;
  
}
