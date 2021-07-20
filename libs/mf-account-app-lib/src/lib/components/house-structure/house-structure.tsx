import React from 'react';
import { Dropdown, Form, Segment, Select } from 'semantic-ui-react';
import { GET_STRUCTURE } from '../../graphql/graphql';
import { useStructureQuery } from '../../services/useRequest';

import './house-structure.module.scss';

/* eslint-disable-next-line */
export interface HouseStructureProps {
}

export function HouseStructure(props: HouseStructureProps) {
  const [items, setItems] = React.useState([])

  const { loading, error, data } = useStructureQuery(GET_STRUCTURE);
  React.useEffect(() => {
    console.log(data)
    if (data) {
      setItems(data.structureRoots.map(({ structureName, structureID }) => ({ key: structureID, value: structureName, text: structureName })));
    }
  }, [data]);


  return (
    <Form.Field>
      <Segment>
        <Dropdown
          options={items}
          placeholder="Select House"
          search
          // searchInput={{ autoFocus: true }}
          selection
        />
      </Segment>
    </Form.Field>
  );
}

export default HouseStructure;
