import React from 'react';

import './../../../assets/style/index.scss'
import { Segment, Table } from 'semantic-ui-react'

import img4 from 'libs/shared-components/src/NoPath.png';

/* eslint-disable-next-line */
export interface PeopleTasks { }

export function PeopleList(props: PeopleTasks) {

  const description = [
    <Segment>Pellentesque habitant morbi tristique senectus.</Segment>

  ]
  return (

    <div className="app-content-body ">

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="no_background">Name</Table.HeaderCell>
            <Table.HeaderCell className="no_background">Email</Table.HeaderCell>
            <Table.HeaderCell className="no_background">Phone</Table.HeaderCell>
            <Table.HeaderCell className="no_background">Type</Table.HeaderCell>
            <Table.HeaderCell className="no_background"> </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell><span> <img src={img4} className="  mr-10 " /> Zhenya Rynzhuk  </span>
            </Table.Cell>
            <Table.Cell>zhenya.rynzhuk@gmail.com</Table.Cell>
            <Table.Cell>+1-253-652-2514</Table.Cell>
            <Table.Cell><button className="ui mini button primary btn_radius"> Project Leader</button> </Table.Cell>
            <Table.Cell><span className="mr-2"  >...</span></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell><span> <img src={img4} className="  mr-10 " /> Zhenya Rynzhuk  </span>
            </Table.Cell>
            <Table.Cell>zhenya.rynzhuk@gmail.com</Table.Cell>
            <Table.Cell>+1-253-652-2514</Table.Cell>
            <Table.Cell><button className="ui mini button primary btn_radius"> Disciplene leader</button> </Table.Cell>
            <Table.Cell><span className="mr-2"  >...</span></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell><span> <img src={img4} className="  mr-10 " /> Zhenya Rynzhuk  </span>
            </Table.Cell>
            <Table.Cell>zhenya.rynzhuk@gmail.com</Table.Cell>
            <Table.Cell>+1-253-652-2514</Table.Cell>
            <Table.Cell><button className="ui mini button primary btn_radius"> Standard user </button> </Table.Cell>
            <Table.Cell><span className="mr-2"  >...</span></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div className="card1 card-custom gutter-b">


      </div>







    </div>


  );
}

export default PeopleList;
