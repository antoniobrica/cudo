import { Field, InputType } from '@nestjs/graphql';

@InputType()
class BkpHierarchyFilterParam {

  @Field({ description: `Bkp Main Tilte` })
  bkpMain: string;
}

export default BkpHierarchyFilterParam;