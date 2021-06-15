import React from 'react';
import { Form, Select, Dropdown } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_REFERENCES } from '../../graphql/graphql';

import './assignee.module.scss';
import { useQuery } from '@apollo/client';

/* eslint-disable-next-line */
export interface AssigneeProps {
  parentBKPSelect,
  name?
}
enum ReferenceType {
  COMPANY = "COMPANY"
}
export function Assignee(props: AssigneeProps) {
  const [items, setItems] = React.useState([])
  const [assignee, setAssignee] = React.useState("")

  const { loading, error, data } = useQuery(GET_REFERENCES, {
    variables: {
      referenceType: ReferenceType.COMPANY,
      referenceID: "Sftobiz_1234"
    }
  });
  React.useEffect(() => {
    if (data) {
      setItems(data.references.users.map(({ userName, userID }) => ({ key: userID, value: userName, text: userName, id: userID })));

    }
  }, [data]);

  const onAssignee = (event, data) => {
    const peopleArr = [];
    for (let i = 0; i < data.value.length; i++) {
      items.map(d => {
        if (d.value == data.value[i]) {
          peopleArr.push({ userID: d.id, userName: data.value[i] });

        }
      })
    }

    setAssignee(data.value)
    props.parentBKPSelect(peopleArr)
  }
  return (
    <Form.Field>
      {/* <label>Assignee  </label>
      <Select placeholder='Select' className="small" 
      options={items}
      value={assignee}
      onChange={onAssignee}
      /> */}
      <label>{props.name}</label>

      <Dropdown className="small_drop"
        clearable
        fluid
        multiple
        search
        selection
        options={items}
        //value={assignee}
        onChange={onAssignee}
        placeholder='Select'
      />

    </Form.Field>
  );
}

export default Assignee;
