import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectfileInput {

 @Field({description:'File Name'})
 projectId: string ;


  @Field({description:'File Name'})
  phaseId: string ;

  @Field({description:'File Name'})
  fileTitle: string ;

  @Field({description:'File Name'})
  filetypeId: string ;

  @Field({description:'File Name'})
  filestructureId: string ;

  @Field({description:'File Name'})
  folderName: string ;

  @Field({description:'File Name'})
  bkpId: string ;

  @Field({description:'File Name'})
  isFolderNameExist?: boolean;

  @Field({description:'File Name'})
  isEveryOneAllowed?: boolean;

  @Field({ nullable: true, description: `updated By` })
  updatedBy?: string;

  @Field({ nullable: true, description: `created by` })
  createdBy?: string;


}

