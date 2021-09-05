import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Form, Segment, Select } from 'semantic-ui-react';
import { GET_STRUCTURE } from '../../graphql/graphql';
import { useStructureQuery } from '../../services/useRequest';

import './house-structure.module.scss';

/* eslint-disable-next-line */
export interface HouseStructureProps {
}

export function HouseStructure(props: HouseStructureProps) {
  const [items, setItems] = React.useState([])
  const {t} = useTranslation()

  const { loading, error, data } = useStructureQuery(GET_STRUCTURE);
  React.useEffect(() => {
   
    if (data) {
      setItems(data.structureRoots.map(({ structureName, structureID }) => ({ key: structureID, value: structureName, text: structureName })));
    }
  }, [data]);


  return (
    <Form.Field>
      <Segment>
        <Dropdown
          options={items}
          placeholder={t("project_tab_menu.cost.add_house")}
          search
          // searchInput={{ autoFocus: true }}
          selection
          clearable
        />
      </Segment>
    </Form.Field>
  );
}

export default HouseStructure;
