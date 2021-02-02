import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as avro from 'avsc';


export interface SetEntity {
  id: number;
  name: string;
  numParts: number;
  year: string;
}

@Resolver('Set')
export class SetResolver {

	avroTaskSchema = {
    name: 'TaskType',
    type: 'record',
    fields: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'createdDate',
        type: 'string'
      }
    ]
  };  typeTask = avro.Type.forSchema({
    name: 'Pet',
    type: 'record',
    fields: [
      {name: 'kind', type: {name: 'Kind', type:
       'enum', symbols: ['CAT', 'DOG']}},
      {name: 'name', type: 'string'}
    ]
  });
    messageBuffer = this.typeTask.toBuffer({
      kind: "DOG",
      name: "Bulldog",
    });
  private sets: SetEntity[] = [
    {
      id: 1,
      name: 'Voltron',
      numParts: 2300,
      year: '2019'
    },
    {
      id: 2,
      name: 'Ship in a Bottle',
      numParts: 900,
      year: '2019'
    }
  ];

  @Query('allSets')
  getAllSets(): SetEntity[] {
    console.log(this.messageBuffer);
    console.log(this.typeTask.fromBuffer(this.messageBuffer));
    return this.sets;
  }

  @Mutation()
  addSet(
    @Args('name') name: string,
    @Args('year') year: string,
    @Args('numParts') numParts: number
  ) {
    const newSet = {
      id: this.sets.length + 1,
      name,
      year,
      numParts: +numParts
    };

    this.sets.push(newSet);

    return newSet;
  }
}