import { Field, ObjectType } from '@nestjs/graphql';
import { BkpLayerOneModel } from './bkp-layerOne.model';
import { bkpLayerTwoModel } from './bkp-layerTwo.model';
import { BkpHierarchyModel } from './bkphierarchy.model';

@ObjectType()
export class SearchModel {

  @Field(type => [BkpHierarchyModel])
  mainBkp: BkpHierarchyModel[]

  @Field(type => [BkpLayerOneModel])
  BkpLayerOne: BkpLayerOneModel[]

  @Field(type => [bkpLayerTwoModel])
  BkpLayerTwo: bkpLayerTwoModel[]

}



